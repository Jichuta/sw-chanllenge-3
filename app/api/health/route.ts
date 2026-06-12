import { NextResponse } from "next/server";

export const GET = () =>
  NextResponse.json({
    ok: true,
    service: "recruitment-portal",
    timestamp: new Date().toISOString()
  });
