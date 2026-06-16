import { redirect } from "next/navigation";
import { isLocalMode } from "@/src/lib/db/config";
import { getCurrentUser } from "@/src/server/auth/session";
import { clearSessionCookie } from "@/src/server/auth/local-auth";
import { createClient } from "@/src/lib/supabase/server";
import { findAdminProfileById, findAdminProfileByAuthUserId } from "@/src/server/repositories/admin-profile.repository";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const signOut = async () => {
  "use server";

  if (isLocalMode()) {
    await clearSessionCookie();
    redirect("/admin/login");
  }

  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  const admin = isLocalMode()
    ? await findAdminProfileById(user.id)
    : await findAdminProfileByAuthUserId(user.id);

  if (!admin?.is_active) {
    if (isLocalMode()) {
      await clearSessionCookie();
    } else {
      const sb = await createClient();
      await sb.auth.signOut();
    }
    redirect("/admin/login");
  }

  return <AdminShell onSignOut={signOut}>{children}</AdminShell>;
};

export default DashboardLayout;
