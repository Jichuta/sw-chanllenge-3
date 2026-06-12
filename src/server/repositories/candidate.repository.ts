import type { CandidateRow } from "@/src/types/database";
import type { CandidateFiltersInput } from "@/src/lib/validation/candidate.schema";

export const listCandidates = async (
  _filters: CandidateFiltersInput
): Promise<CandidateRow[]> => {
  throw new Error("Candidate repository will be implemented with Supabase in Sprint 2.");
};
