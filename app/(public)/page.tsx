import { ArrowRight, FileText } from "lucide-react";
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
            Submit your personal information and CV in PDF format for HR review.
            Your data is securely stored and processed through our recruitment API.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/apply" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Apply now
          </ButtonLink>
          <ButtonLink
            href="/admin"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            className="bg-transparent text-foreground hover:bg-muted"
          >
            HR area
          </ButtonLink>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">What you need</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</span>
            Personal details: name, email, phone
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</span>
            Location: country and city
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</span>
            English level selection
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">4</span>
            CV file in PDF format (max 5 MB)
          </li>
        </ul>
      </div>
    </section>
  </main>
);

export default HomePage;
