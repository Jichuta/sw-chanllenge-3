import { createClient } from "@supabase/supabase-js";
import { createMockDataClient } from "@/src/lib/supabase/mock-client";

export const createServiceRoleClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return createMockDataClient();
  }

  return createClient(supabaseUrl, serviceRoleKey);
};
