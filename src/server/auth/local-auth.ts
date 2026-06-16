import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { query } from "@/src/lib/db/index";
import { getJwtSecret } from "@/src/lib/db/config";

const COOKIE_NAME = "auth-token";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export type LocalSessionPayload = {
  adminId: string;
  email: string;
  iat: number;
  exp: number;
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ token: string; adminId: string } | null> => {
  const result = await query(
    "SELECT id, email, password_hash, is_active FROM admin_profiles WHERE email = $1",
    [email.toLowerCase().trim()]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  if (!row.is_active) return null;
  if (!row.password_hash) return null;

  const valid = await bcrypt.compare(password, row.password_hash);
  if (!valid) return null;

  const secret = getJwtSecret();
  const token = jwt.sign(
    { adminId: row.id, email: row.email } as Omit<LocalSessionPayload, "iat" | "exp">,
    secret,
    { expiresIn: SESSION_DURATION_SECONDS }
  );

  return { token, adminId: row.id };
};

export const getSession = async (): Promise<LocalSessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const secret = getJwtSecret();
    const payload = jwt.verify(token, secret) as LocalSessionPayload;
    return payload;
  } catch {
    return null;
  }
};

export const setSessionCookie = (token: string): Response => {
  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DURATION_SECONDS}`
  );
  return response;
};

export const clearSessionCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
};

export const getSessionCookieName = (): string => COOKIE_NAME;
