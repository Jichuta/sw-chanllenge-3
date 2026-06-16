import type { CandidateRow } from "@/src/types/database";
import type { CandidateFiltersInput } from "@/src/lib/validation/candidate.schema";
import { isLocalMode } from "@/src/lib/db/config";
import { query as dbQuery } from "@/src/lib/db/index";
import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const TABLE = "candidates";

const toISO = (v: unknown): string =>
  v instanceof Date ? v.toISOString() : String(v ?? "");

const rowToCandidate = (row: Record<string, unknown>): CandidateRow => ({
  id: row.id as string,
  name: row.name as string,
  email: row.email as string,
  phone: row.phone as string,
  age: row.age as number,
  country: row.country as string,
  city: row.city as string,
  english_level: row.english_level as CandidateRow["english_level"],
  status: row.status as CandidateRow["status"],
  cv_file_name: row.cv_file_name as string,
  cv_file_path: row.cv_file_path as string,
  cv_mime_type: "application/pdf",
  cv_file_size: row.cv_file_size as number,
  status_updated_by: (row.status_updated_by as string) ?? null,
  status_updated_at: row.status_updated_at ? toISO(row.status_updated_at) : null,
  created_at: toISO(row.created_at),
  updated_at: toISO(row.updated_at),
});

export const insertCandidate = async (
  row: CandidateRow
): Promise<CandidateRow> => {
  if (isLocalMode()) {
    const result = await dbQuery(
      `INSERT INTO candidates (id, name, email, phone, age, country, city, english_level, status, cv_file_name, cv_file_path, cv_mime_type, cv_file_size, status_updated_by, status_updated_at, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       RETURNING *`,
      [
        row.id, row.name, row.email, row.phone, row.age,
        row.country, row.city, row.english_level, row.status,
        row.cv_file_name, row.cv_file_path, row.cv_mime_type, row.cv_file_size,
        row.status_updated_by, row.status_updated_at, row.created_at, row.updated_at,
      ]
    );
    return rowToCandidate(result.rows[0]);
  }

  const sb = createServiceRoleClient();
  const { data, error } = await sb
    .from(TABLE)
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(`Failed to insert candidate: ${error.message}`);
  return data as CandidateRow;
};

export const listCandidates = async (
  filters: CandidateFiltersInput
): Promise<CandidateRow[]> => {
  if (isLocalMode()) {
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIdx = 0;

    if (filters.country) {
      paramIdx++;
      conditions.push(`country = $${paramIdx}`);
      params.push(filters.country);
    }

    if (filters.city) {
      paramIdx++;
      conditions.push(`city = $${paramIdx}`);
      params.push(filters.city);
    }

    if (filters.englishLevel) {
      paramIdx++;
      conditions.push(`english_level = $${paramIdx}`);
      params.push(filters.englishLevel);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await dbQuery(
      `SELECT * FROM candidates ${where} ORDER BY created_at DESC`,
      params
    );
    return result.rows.map(rowToCandidate);
  }

  const sb = createServiceRoleClient();
  let query = sb.from(TABLE).select();

  if (filters.country) query = query.eq("country", filters.country);
  if (filters.city) query = query.eq("city", filters.city);
  if (filters.englishLevel) query = query.eq("english_level", filters.englishLevel);

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to list candidates: ${error.message}`);
  return (data ?? []) as CandidateRow[];
};

export const findCandidateById = async (id: string): Promise<CandidateRow | null> => {
  if (isLocalMode()) {
    const result = await dbQuery("SELECT * FROM candidates WHERE id = $1 LIMIT 1", [id]);
    if (result.rows.length === 0) return null;
    return rowToCandidate(result.rows[0]);
  }

  const sb = createServiceRoleClient();
  const { data, error } = await sb
    .from(TABLE)
    .select()
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to find candidate: ${error.message}`);
  }
  return data as CandidateRow;
};

export const updateCandidateStatus = async (
  id: string,
  status: string,
  adminId?: string
): Promise<CandidateRow> => {
  const now = new Date().toISOString();

  if (isLocalMode()) {
    const result = await dbQuery(
      `UPDATE candidates SET status = $1, status_updated_at = $2, status_updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING *`,
      [status, now, adminId ?? null, now, id]
    );
    if (result.rows.length === 0) throw new Error("Candidate not found");
    return rowToCandidate(result.rows[0]);
  }

  const sb = createServiceRoleClient();
  const updates: Record<string, string | null> = {
    status,
    status_updated_at: now,
    updated_at: now,
  };
  if (adminId) updates.status_updated_by = adminId;

  const { data, error } = await sb
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update candidate status: ${error.message}`);
  return data as CandidateRow;
};
