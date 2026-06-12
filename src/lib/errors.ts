import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

type ApiErrorOptions = Readonly<{
  status: number;
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}>;

export const apiError = ({ status, code, message, details }: ApiErrorOptions) =>
  NextResponse.json(
    {
      error: {
        code,
        message,
        details: details ?? null
      }
    },
    { status }
  );
