import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/server/auth/require-admin";
import { getCandidateById } from "@/src/server/services/candidate.service";
import { apiError } from "@/src/lib/errors";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  const candidate = await getCandidateById(id);

  if (!candidate) {
    return apiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Candidate not found"
    });
  }

  return NextResponse.json({ data: candidate });
};
