import fs from "node:fs";
import path from "node:path";
import { isLocalMode, getCvStoragePath } from "@/src/lib/db/config";
import { createServiceRoleClient } from "@/src/lib/supabase/service-role";

const BUCKET = process.env.SUPABASE_CV_BUCKET ?? "candidate-cvs";

export const uploadCv = async (
  candidateId: string,
  file: File
): Promise<{ filePath: string; fileName: string }> => {
  const extension = file.name.split(".").pop() ?? "pdf";
  const fileName = `${candidateId}-cv.${extension}`;
  const filePath = `candidates/${candidateId}/${fileName}`;

  if (isLocalMode()) {
    const storagePath = getCvStoragePath();
    const dir = path.join(storagePath, "candidates", candidateId);
    fs.mkdirSync(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(dir, fileName), buffer);

    return { filePath, fileName: file.name };
  }

  const sb = createServiceRoleClient();
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

export const getCvSignedUrl = async (
  filePath: string
): Promise<string> => {
  if (isLocalMode()) {
    const storagePath = getCvStoragePath();
    const absolutePath = path.join(storagePath, filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error("CV file not found");
    }
    return `/api/cv/${filePath}`;
  }

  const sb = createServiceRoleClient();
  const { data, error } = await sb.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 60);

  if (error) throw new Error(`Failed to generate CV URL: ${error.message}`);
  return data.signedUrl;
};
