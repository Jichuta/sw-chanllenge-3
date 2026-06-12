import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/server/auth/require-admin";
import { updateStatus } from "@/src/server/services/candidate.service";
import { candidateStatusUpdateSchema } from "@/src/lib/validation/candidate.schema";
import { apiError } from "@/src/lib/errors";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError({
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid JSON body"
    });
  }

  const parsed = candidateStatusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return apiError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Invalid status value",
      details: parsed.error.flatten().fieldErrors
    });
  }

  const candidate = await updateStatus(id, parsed.data.status, auth.admin.id);

  return NextResponse.json({ data: candidate });
};
