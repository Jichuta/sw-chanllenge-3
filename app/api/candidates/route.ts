import { NextRequest, NextResponse } from "next/server";
import { candidateApplicationSchema } from "@/src/lib/validation/candidate.schema";
import { apiError } from "@/src/lib/errors";
import { createCandidate } from "@/src/server/services/candidate.service";
import { MAX_CV_FILE_SIZE_BYTES, ACCEPTED_CV_MIME_TYPE } from "@/src/lib/constants";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const fields = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      age: formData.get("age"),
      country: formData.get("country"),
      city: formData.get("city"),
      englishLevel: formData.get("englishLevel")
    };

    const parsed = candidateApplicationSchema.safeParse(fields);
    if (!parsed.success) {
      return apiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Invalid form data",
        details: parsed.error.flatten().fieldErrors
      });
    }

    const file = formData.get("cv");
    if (!file || !(file instanceof File) || file.size === 0) {
      return apiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "CV file is required and must be a PDF"
      });
    }

    if (file.type !== ACCEPTED_CV_MIME_TYPE) {
      return apiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "CV must be a PDF file"
      });
    }

    if (file.size > MAX_CV_FILE_SIZE_BYTES) {
      return apiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "CV file must be under 5 MB"
      });
    }

    const candidate = await createCandidate(parsed.data, file);

    return NextResponse.json({ ok: true, data: candidate }, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return apiError({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred. Please try again."
    });
  }
};
