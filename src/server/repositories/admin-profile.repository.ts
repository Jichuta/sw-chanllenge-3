import type { AdminProfileRow } from "@/src/types/database";
import { isLocalMode } from "@/src/lib/db/config";
import { query } from "@/src/lib/db/index";
import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const TABLE = "admin_profiles";

const rowToAdmin = (row: Record<string, unknown>): AdminProfileRow => ({
  id: row.id as string,
  auth_user_id: (row.auth_user_id as string) ?? null,
  email: row.email as string,
  name: row.name as string,
  role: row.role as "Admin",
  is_active: Boolean(row.is_active),
  created_at: row.created_at as string,
  updated_at: row.updated_at as string,
});

export const findAdminProfileByAuthUserId = async (
  authUserId: string
): Promise<AdminProfileRow | null> => {
  if (isLocalMode()) {
    const result = await query(
      "SELECT * FROM admin_profiles WHERE auth_user_id = $1 LIMIT 1",
      [authUserId]
    );
    if (result.rows.length === 0) return null;
    return rowToAdmin(result.rows[0]);
  }

  const sb = createServiceRoleClient();

  const { data, error } = await sb
    .from(TABLE)
    .select()
    .eq("auth_user_id", authUserId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to find admin profile: ${error.message}`);
  }

  return data as AdminProfileRow;
};

export const findAdminProfileById = async (
  id: string
): Promise<AdminProfileRow | null> => {
  const result = await query(
    "SELECT * FROM admin_profiles WHERE id = $1 LIMIT 1",
    [id]
  );
  if (result.rows.length === 0) return null;
  return rowToAdmin(result.rows[0]);
};
