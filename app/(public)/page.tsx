import { ArrowRight, FileText } from "lucide-react";
import { CandidateApplicationPlaceholder } from "@/components/forms/candidate-application-placeholder";
import { ButtonLink } from "@/components/ui/button-link";

const HomePage = () => (
  <main className="min-h-screen bg-background">
    <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Recruitment portal
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
            Candidate application
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Submit candidate information and a PDF CV for HR review. The full form
            and persistence flow will be implemented in Sprint 2.
          </p>
        </div>
        <ButtonLink href="/admin" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
          Open HR area
        </ButtonLink>
      </div>
      <CandidateApplicationPlaceholder />
    </section>
  </main>
);

export default HomePage;
