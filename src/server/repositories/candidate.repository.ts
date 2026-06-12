import type { CandidateRow } from "@/src/types/database";
import type { CandidateFiltersInput } from "@/src/lib/validation/candidate.schema";
import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const TABLE = "candidates";

export const insertCandidate = async (
  row: CandidateRow
): Promise<CandidateRow> => {
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
  const sb = createServiceRoleClient();
  let query = sb.from(TABLE).select();

  if (filters.country) {
    query = query.eq("country", filters.country);
  }

  if (filters.city) {
    query = query.eq("city", filters.city);
  }

  if (filters.englishLevel) {
    query = query.eq("english_level", filters.englishLevel);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to list candidates: ${error.message}`);

  return (data ?? []) as CandidateRow[];
};

export const findCandidateById = async (id: string): Promise<CandidateRow | null> => {
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
  const sb = createServiceRoleClient();
  const now = new Date().toISOString();

  const updates: Record<string, string | null> = {
    status,
    status_updated_at: now,
    updated_at: now
  };

  if (adminId) {
    updates.status_updated_by = adminId;
  }

  const { data, error } = await sb
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update candidate status: ${error.message}`);

  return data as CandidateRow;
};
