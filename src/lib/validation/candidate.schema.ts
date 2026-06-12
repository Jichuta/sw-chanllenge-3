import { z } from "zod";
import { CANDIDATE_STATUSES, ENGLISH_LEVELS } from "@/src/lib/constants";

export const candidateApplicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  age: z.coerce.number().int().min(16).max(100),
  country: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
  englishLevel: z.enum(ENGLISH_LEVELS)
});

export const candidateStatusUpdateSchema = z.object({
  status: z.enum(CANDIDATE_STATUSES)
});

export const candidateFiltersSchema = z.object({
  country: z.string().trim().min(2).max(80).optional(),
  city: z.string().trim().min(2).max(80).optional(),
  englishLevel: z.enum(ENGLISH_LEVELS).optional()
});

export type CandidateApplicationInput = z.infer<typeof candidateApplicationSchema>;
export type CandidateStatusUpdateInput = z.infer<typeof candidateStatusUpdateSchema>;
export type CandidateFiltersInput = z.infer<typeof candidateFiltersSchema>;
