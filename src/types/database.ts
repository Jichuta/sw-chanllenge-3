import type { CandidateStatus, EnglishLevel } from "@/src/types/candidate";

export type CandidateRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: EnglishLevel;
  status: CandidateStatus;
  cv_file_name: string;
  cv_file_path: string;
  cv_mime_type: "application/pdf";
  cv_file_size: number;
  status_updated_by: string | null;
  status_updated_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminProfileRow = {
  id: string;
  auth_user_id: string | null;
  email: string;
  name: string;
  role: "Admin";
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
