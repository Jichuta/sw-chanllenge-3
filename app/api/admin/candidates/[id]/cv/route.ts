import { NextRequest } from "next/server";
import { requireAdmin } from "@/src/server/auth/require-admin";
import { getCandidateCvUrl } from "@/src/server/services/candidate.service";
import { apiError } from "@/src/lib/errors";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    const url = await getCandidateCvUrl(id);
    return Response.redirect(url);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to open CV";

    if (message === "Candidate not found") {
      return apiError({
        status: 404,
        code: "NOT_FOUND",
        message
      });
    }

    return apiError({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Failed to open CV file"
    });
  }
};
