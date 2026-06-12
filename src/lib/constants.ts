import type { EnglishLevel, EnglishLevelTone } from "@/src/types/candidate";
import { candidateStatuses, englishLevels } from "@/src/types/candidate";

export const ENGLISH_LEVELS = englishLevels;
export const CANDIDATE_STATUSES = candidateStatuses;

export const MAX_CV_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_CV_MIME_TYPE = "application/pdf";

export const getEnglishLevelTone = (level: EnglishLevel): EnglishLevelTone => {
  if (level === "B1") {
    return "warning";
  }

  if (level === "A1" || level === "A2") {
    return "danger";
  }

  return "success";
};

export const getEnglishLevelLabel = (level: EnglishLevel) => {
  const tone = getEnglishLevelTone(level);

  if (tone === "success") {
    return "Strong English";
  }

  if (tone === "warning") {
    return "Intermediate English";
  }

  return "Below target";
};
