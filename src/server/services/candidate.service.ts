import type { CandidateFiltersInput } from "@/src/lib/validation/candidate.schema";
import { listCandidates } from "@/src/server/repositories/candidate.repository";

export const getCandidates = async (filters: CandidateFiltersInput) => {
  return listCandidates(filters);
};
