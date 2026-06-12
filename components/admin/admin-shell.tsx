import { LogOut } from "lucide-react";
import Link from "next/link";

type AdminShellProps = Readonly<{
  children: React.ReactNode;
  onSignOut?: () => void;
}>;

export const AdminShell = ({ children, onSignOut }: AdminShellProps) => (
  <main className="min-h-screen bg-muted">
    <div className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/admin/candidates" className="text-sm font-semibold">
          HR Portal
        </Link>
        <div className="flex items-center gap-4">
          {onSignOut && (
            <form action={onSignOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Sign out
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
  </main>
);
