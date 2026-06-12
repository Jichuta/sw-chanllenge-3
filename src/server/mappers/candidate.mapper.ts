import type { Candidate } from "@/src/types/candidate";
import type { CandidateRow } from "@/src/types/database";

export const toCandidate = (row: CandidateRow): Candidate => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  age: row.age,
  country: row.country,
  city: row.city,
  englishLevel: row.english_level,
  status: row.status,
  cv: {
    fileName: row.cv_file_name,
    url: `/api/candidates/${row.id}/cv`,
    mimeType: row.cv_mime_type,
    fileSize: row.cv_file_size
  },
  statusUpdatedBy: row.status_updated_by,
  statusUpdatedAt: row.status_updated_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const toCandidateRow = (
  data: Omit<CandidateRow, "created_at" | "updated_at" | "status_updated_by" | "status_updated_at">
): CandidateRow => ({
  ...data,
  status_updated_by: null,
  status_updated_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});
