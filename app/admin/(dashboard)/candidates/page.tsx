"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CandidateFilters } from "@/components/admin/candidate-filters";
import { CandidatesTable } from "@/components/admin/candidates-table";
import type { Candidate } from "@/src/types/candidate";

const AdminCandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/candidates");
        const result = await response.json();

        if (!response.ok) {
          toast.error(result?.error?.message ?? "Failed to load candidates");
          return;
        }

        setCandidates(result.data);
      } catch {
        toast.error("Failed to load candidates");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFilter = async (filters: { country: string; city: string; englishLevel: string }) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      if (filters.country) params.set("country", filters.country);
      if (filters.city) params.set("city", filters.city);
      if (filters.englishLevel) params.set("englishLevel", filters.englishLevel);

      const query = params.toString() ? `?${params.toString()}` : "";
      const response = await fetch(`/api/admin/candidates${query}`);
      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.error?.message ?? "Failed to load candidates");
        return;
      }

      setCandidates(result.data);
    } catch {
      toast.error("Failed to load candidates");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Candidates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage candidate applications
        </p>
      </div>

      <CandidateFilters onFilter={handleFilter} />

      {isLoading ? (
        <div className="rounded-lg border border-border bg-white p-8 text-center text-sm text-muted-foreground">
          Loading candidates...
        </div>
      ) : (
        <CandidatesTable candidates={candidates} />
      )}
    </section>
  );
};

export default AdminCandidatesPage;
