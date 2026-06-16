import { apiError } from "@/src/lib/errors";
import { getCurrentUser } from "@/src/server/auth/session";
import { isLocalMode } from "@/src/lib/db/config";
import { findAdminProfileByAuthUserId, findAdminProfileById } from "@/src/server/repositories/admin-profile.repository";
import type { AdminProfileRow } from "@/src/types/database";

export const requireAdmin = async (): Promise<
  | { ok: true; admin: AdminProfileRow }
  | { ok: false; response: Response }
> => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
      response: apiError({
        status: 401,
        code: "UNAUTHORIZED",
        message: "Authentication required"
      })
    };
  }

  const admin = isLocalMode()
    ? await findAdminProfileById(user.id)
    : await findAdminProfileByAuthUserId(user.id);

  if (!admin || !admin.is_active) {
    return {
      ok: false,
      response: apiError({
        status: 403,
        code: "FORBIDDEN",
        message: "Admin access required"
      })
    };
  }

  return { ok: true, admin };
};
