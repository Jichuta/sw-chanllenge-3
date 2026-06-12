import { ArrowLeft, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { CandidateApplicationForm } from "@/components/forms/candidate-application-form";

const ApplyPage = () => (
  <main className="min-h-screen bg-background">
    <section className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 space-y-4">
        <ButtonLink
          href="/"
          className="inline-flex h-auto gap-1.5 bg-transparent px-0 text-sm text-muted-foreground hover:opacity-70"
          icon={<ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />}
        >
          Back to home
        </ButtonLink>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Recruitment portal
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-foreground">
            Submit your application
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Fill in your details and upload your CV in PDF format. All fields are required.
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <CandidateApplicationForm />
      </div>
    </section>
  </main>
);

export default ApplyPage;
