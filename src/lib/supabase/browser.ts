import { createBrowserClient } from "@supabase/ssr";
import { createMockBrowserClient } from "@/src/lib/supabase/mock-client";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return createMockBrowserClient();
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
