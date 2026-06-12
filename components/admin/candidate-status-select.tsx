"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CANDIDATE_STATUSES } from "@/src/lib/constants";
import type { CandidateStatus } from "@/src/types/candidate";

type CandidateStatusSelectProps = Readonly<{
  candidateId: string;
  currentStatus: CandidateStatus;
  onStatusChange: (newStatus: CandidateStatus) => void;
}>;

export const CandidateStatusSelect = ({
  candidateId,
  currentStatus,
  onStatusChange
}: CandidateStatusSelectProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as CandidateStatus;
    setIsUpdating(true);

    try {
      const response = await fetch(
        `/api/admin/candidates/${candidateId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.error?.message ?? "Failed to update status");
        return;
      }

      toast.success(`Status updated to ${newStatus}`);
      onStatusChange(newStatus);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
      className="rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
    >
      {CANDIDATE_STATUSES.map((status) => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
};
