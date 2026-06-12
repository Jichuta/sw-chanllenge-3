import Link from "next/link";
import { Eye, FileText } from "lucide-react";
import { EnglishLevelBadge } from "@/components/admin/english-level-badge";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/src/lib/formatters";
import type { Candidate } from "@/src/types/candidate";

type CandidatesTableProps = Readonly<{
  candidates: Candidate[];
}>;

const statusTone = {
  "In Review": "warning" as const,
  "Accepted": "success" as const,
  "Rejected": "danger" as const
};

export const CandidatesTable = ({ candidates }: CandidatesTableProps) => {
  if (candidates.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white p-8 text-center text-sm text-muted-foreground">
        No candidates found matching the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted text-xs font-medium uppercase text-muted-foreground">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">English</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">CV</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium">{candidate.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{candidate.email}</td>
              <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                {candidate.city}, {candidate.country}
              </td>
              <td className="px-4 py-3">
                <EnglishLevelBadge level={candidate.englishLevel} />
              </td>
              <td className="px-4 py-3">
                <Badge tone={statusTone[candidate.status]}>{candidate.status}</Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                {formatDate(candidate.createdAt)}
              </td>
              <td className="px-4 py-3">
                <a
                  href={`/api/admin/candidates/${candidate.id}/cv`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Open CV
                </a>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/candidates/${candidate.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
