type AdminShellProps = Readonly<{
  children: React.ReactNode;
}>;

export const AdminShell = ({ children }: AdminShellProps) => (
  <main className="min-h-screen bg-muted">
    <div className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold">HR Portal</span>
        <span className="text-xs text-muted-foreground">Admin area</span>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
  </main>
);
