import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const BUCKET = process.env.SUPABASE_CV_BUCKET ?? "candidate-cvs";

export const uploadCv = async (
  candidateId: string,
  file: File
): Promise<{ filePath: string; fileName: string }> => {
  const sb = createServiceRoleClient();
  const extension = file.name.split(".").pop() ?? "pdf";
  const fileName = `${candidateId}-cv.${extension}`;
  const filePath = `candidates/${candidateId}/${fileName}`;

  const buffer = await file.arrayBuffer();

  const { error } = await sb.storage
    .from(BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false
    });

  if (error) throw new Error(`Failed to upload CV: ${error.message}`);

  return { filePath, fileName: file.name };
};
