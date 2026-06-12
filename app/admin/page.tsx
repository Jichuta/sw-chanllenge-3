import { AdminShell } from "@/components/admin/admin-shell";

const AdminPage = () => (
  <AdminShell>
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">HR candidate review</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Admin authentication, candidate filters, CV access, and status updates
          will be implemented in Sprint 3.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-white p-5">
        <p className="text-sm font-medium">Sprint 1 foundation is ready.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This page reserves the admin route and layout boundary for the HR workflow.
        </p>
      </div>
    </section>
  </AdminShell>
);

export default AdminPage;
