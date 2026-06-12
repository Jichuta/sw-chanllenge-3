import type { AdminProfileRow } from "@/src/types/database";
import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const TABLE = "admin_profiles";

export const findAdminProfileByAuthUserId = async (
  authUserId: string
): Promise<AdminProfileRow | null> => {
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
