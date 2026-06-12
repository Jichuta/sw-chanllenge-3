export const englishLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type EnglishLevel = (typeof englishLevels)[number];

export const candidateStatuses = ["In Review", "Accepted", "Rejected"] as const;
export type CandidateStatus = (typeof candidateStatuses)[number];

export type EnglishLevelTone = "success" | "warning" | "danger";

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  englishLevel: EnglishLevel;
  status: CandidateStatus;
  cv: {
    fileName: string;
    url: string;
    mimeType: "application/pdf";
    fileSize: number;
  };
  statusUpdatedBy: string | null;
  statusUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
