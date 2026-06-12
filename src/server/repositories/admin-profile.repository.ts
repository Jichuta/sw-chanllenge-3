import type { AdminProfileRow } from "@/src/types/database";

export const findAdminProfileByAuthUserId = async (
  _authUserId: string
): Promise<AdminProfileRow | null> => {
  throw new Error("Admin profile repository will be implemented with Supabase in Sprint 3.");
};
