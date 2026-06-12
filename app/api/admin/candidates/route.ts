import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/server/auth/require-admin";
import { getCandidates } from "@/src/server/services/candidate.service";
import { candidateFiltersSchema } from "@/src/lib/validation/candidate.schema";
import { apiError } from "@/src/lib/errors";

export const GET = async (request: NextRequest) => {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const filters = {
    country: searchParams.get("country") || undefined,
    city: searchParams.get("city") || undefined,
    englishLevel: searchParams.get("englishLevel") || undefined
  };

  const parsed = candidateFiltersSchema.safeParse(filters);
  if (!parsed.success) {
    return apiError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Invalid filter parameters",
      details: parsed.error.flatten().fieldErrors
    });
  }

  const candidates = await getCandidates(parsed.data);

  return NextResponse.json({ data: candidates });
};
