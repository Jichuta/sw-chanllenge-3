"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";
import { EnglishLevelBadge } from "@/components/admin/english-level-badge";
import { Badge } from "@/components/ui/badge";
import { CandidateStatusSelect } from "@/components/admin/candidate-status-select";
import { formatDateTime } from "@/src/lib/formatters";
import { formatBytes } from "@/src/lib/formatters";
import type { Candidate, CandidateStatus } from "@/src/types/candidate";

const statusTone: Record<string, "warning" | "success" | "danger"> = {
  "In Review": "warning",
  "Accepted": "success",
  "Rejected": "danger"
};

const AdminCandidateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`/api/admin/candidates/${id}`);
        const result = await response.json();

        if (!response.ok) {
          toast.error(result?.error?.message ?? "Failed to load candidate");
          return;
        }

        setCandidate(result.data);
      } catch {
        toast.error("Failed to load candidate");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleStatusChange = (newStatus: CandidateStatus) => {
    if (candidate) {
      setCandidate({ ...candidate, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-white p-8 text-center text-sm text-muted-foreground">
        Loading candidate...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="rounded-lg border border-border bg-white p-8 text-center text-sm text-muted-foreground">
        Candidate not found.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <Link
        href="/admin/candidates"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to candidates
      </Link>

      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{candidate.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{candidate.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={statusTone[candidate.status]}>{candidate.status}</Badge>
            <CandidateStatusSelect
              candidateId={candidate.id}
              currentStatus={candidate.status}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xs font-medium uppercase text-muted-foreground">Personal Details</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{candidate.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Age</dt>
                <dd>{candidate.age}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Country</dt>
                <dd>{candidate.country}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">City</dt>
                <dd>{candidate.city}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">English level</dt>
                <dd><EnglishLevelBadge level={candidate.englishLevel} /></dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-medium uppercase text-muted-foreground">CV &amp; Dates</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">CV file</dt>
                <dd>
                  <a
                    href={`/api/admin/candidates/${candidate.id}/cv`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    {candidate.cv.fileName}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">CV size</dt>
                <dd>{formatBytes(candidate.cv.fileSize)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Submitted</dt>
                <dd>{formatDateTime(candidate.createdAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last updated</dt>
                <dd>{formatDateTime(candidate.updatedAt)}</dd>
              </div>
              {candidate.statusUpdatedBy && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status updated by</dt>
                  <dd>{candidate.statusUpdatedBy}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCandidateProfilePage;
