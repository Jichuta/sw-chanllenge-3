import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getCvStoragePath } from "@/src/lib/db/config";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) => {
  const { path: segments } = await params;
  const filePath = path.join(getCvStoragePath(), ...segments);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "CV file not found" } },
      { status: 404 }
    );
  }

  const buffer = fs.readFileSync(filePath);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
      "Content-Length": String(buffer.length),
    },
  });
};
