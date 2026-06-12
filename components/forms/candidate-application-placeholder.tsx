const fields = ["Name", "Email", "Phone", "Country", "City", "English level", "PDF CV"];

export const CandidateApplicationPlaceholder = () => (
  <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
    <div className="mb-5">
      <h2 className="text-lg font-semibold">Application form setup</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sprint 2 will replace this placeholder with the validated candidate form.
      </p>
    </div>
    <div className="grid gap-3">
      {fields.map((field) => (
        <div key={field} className="rounded-md border border-border bg-muted px-3 py-2 text-sm">
          {field}
        </div>
      ))}
    </div>
  </div>
);
