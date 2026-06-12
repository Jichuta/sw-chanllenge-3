import type { Candidate, CandidateStatus, EnglishLevel } from "@/src/types/candidate";
import type { CandidateFiltersInput } from "@/src/lib/validation/candidate.schema";
import { toCandidate } from "@/src/server/mappers/candidate.mapper";
import {
  insertCandidate,
  listCandidates,
  findCandidateById,
  updateCandidateStatus
} from "@/src/server/repositories/candidate.repository";
import { uploadCv, getCvSignedUrl } from "@/src/server/services/cv-storage.service";
import { randomUUID } from "node:crypto";

export const createCandidate = async (
  data: {
    name: string;
    email: string;
    phone: string;
    age: number;
    country: string;
    city: string;
    englishLevel: string;
  },
  file: File
): Promise<Candidate> => {
  const candidateId = randomUUID();
  const now = new Date().toISOString();

  const { filePath, fileName } = await uploadCv(candidateId, file);

  const row = await insertCandidate({
    id: candidateId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    country: data.country,
    city: data.city,
    english_level: data.englishLevel as EnglishLevel,
    status: "In Review" as CandidateStatus,
    cv_file_name: fileName,
    cv_file_path: filePath,
    cv_mime_type: "application/pdf",
    cv_file_size: file.size,
    status_updated_by: null,
    status_updated_at: null,
    created_at: now,
    updated_at: now
  });

  return toCandidate(row);
};

export const getCandidates = async (
  filters: CandidateFiltersInput
): Promise<Candidate[]> => {
  const rows = await listCandidates(filters);
  return rows.map(toCandidate);
};

export const getCandidateById = async (
  id: string
): Promise<Candidate | null> => {
  const row = await findCandidateById(id);
  return row ? toCandidate(row) : null;
};

export const updateStatus = async (
  id: string,
  status: string,
  adminId?: string
): Promise<Candidate> => {
  const row = await updateCandidateStatus(id, status, adminId);
  return toCandidate(row);
};

export const getCandidateCvUrl = async (id: string): Promise<string> => {
  const candidate = await findCandidateById(id);

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  return getCvSignedUrl(candidate.cv_file_path);
};
