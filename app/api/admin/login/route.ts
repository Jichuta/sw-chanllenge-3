import { NextRequest, NextResponse } from "next/server";
import { signIn, setSessionCookie } from "@/src/server/auth/local-auth";
import { isLocalMode } from "@/src/lib/db/config";
import { apiError } from "@/src/lib/errors";

const loginSchema = (data: unknown): { email: string; password: string } | null => {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;
  if (typeof d.email !== "string" || typeof d.password !== "string") return null;
  if (!d.email.trim() || !d.password) return null;
  return { email: d.email.trim(), password: d.password };
};

export const POST = async (request: NextRequest) => {
  if (!isLocalMode()) {
    return apiError({
      status: 400,
      code: "BAD_REQUEST",
      message: "Local auth is not available. Use Supabase auth instead.",
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError({ status: 400, code: "BAD_REQUEST", message: "Invalid JSON" });
  }

  const parsed = loginSchema(body);
  if (!parsed) {
    return apiError({ status: 400, code: "VALIDATION_ERROR", message: "Email and password are required" });
  }

  const result = await signIn(parsed.email, parsed.password);

  if (!result) {
    return apiError({ status: 401, code: "UNAUTHORIZED", message: "Invalid email or password" });
  }

  return setSessionCookie(result.token);
};
