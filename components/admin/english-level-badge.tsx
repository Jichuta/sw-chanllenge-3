import { getEnglishLevelTone } from "@/src/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { EnglishLevel } from "@/src/types/candidate";

type EnglishLevelBadgeProps = Readonly<{
  level: EnglishLevel;
}>;

export const EnglishLevelBadge = ({ level }: EnglishLevelBadgeProps) => (
  <Badge tone={getEnglishLevelTone(level)}>{level}</Badge>
);
