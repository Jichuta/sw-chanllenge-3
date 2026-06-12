import { createClient } from "@/src/lib/supabase/server";

export const getSession = async () => {
  const sb = await createClient();
  const { data, error } = await sb.auth.getSession();
  if (error || !data.session) return null;
  return data.session;
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user ?? null;
};
