"use client";

type AdminErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

const AdminError = ({ error, reset }: AdminErrorProps) => {
  const isSupabaseMissing = error.message?.includes("Supabase environment variables");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      {isSupabaseMissing ? (
        <>
          <p className="text-sm text-destructive font-medium">Configuration Required</p>
          <p className="text-sm text-muted-foreground max-w-md">
            The Supabase project credentials are not configured. To use the admin panel, create a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">.env.local</code> file in the
            project root and set the following variables:
          </p>
          <pre className="rounded bg-muted p-3 text-left text-xs font-mono leading-relaxed">
            {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}
          </pre>
          <p className="text-xs text-muted-foreground">
            Find these values in your Supabase project dashboard at{" "}
            <span className="font-mono">Settings &gt; API</span>.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">Something went wrong loading this page.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
};

export default AdminError;
