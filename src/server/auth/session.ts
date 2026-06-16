import { isLocalMode } from "@/src/lib/db/config";
import { getSession as getLocalSession } from "@/src/server/auth/local-auth";
import { createClient } from "@/src/lib/supabase/server";

type LocalUser = { id: string; email: string };

export const getSession = async () => {
  if (isLocalMode()) {
    return getLocalSession();
  }

  const sb = await createClient();
  const { data, error } = await sb.auth.getSession();
  if (error || !data.session) return null;
  return data.session;
};

export const getCurrentUser = async (): Promise<LocalUser | null> => {
  if (isLocalMode()) {
    const payload = await getLocalSession();
    if (!payload) return null;
    return { id: payload.adminId, email: payload.email };
  }

  const sb = await createClient();
  const { data, error } = await sb.auth.getSession();
  if (error || !data.session?.user) return null;
  return { id: data.session.user.id, email: data.session.user.email ?? "" };
};
