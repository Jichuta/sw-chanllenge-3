import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import { findAdminProfileByAuthUserId } from "@/src/server/repositories/admin-profile.repository";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const signOut = async () => {
  "use server";

  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const sb = await createClient();
  const { data: { session } } = await sb.auth.getSession();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const admin = await findAdminProfileByAuthUserId(session.user.id);

  if (!admin?.is_active) {
    await sb.auth.signOut();
    redirect("/admin/login");
  }

  return <AdminShell onSignOut={signOut}>{children}</AdminShell>;
};

export default DashboardLayout;
