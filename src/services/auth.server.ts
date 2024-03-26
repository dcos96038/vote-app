import { createClient } from "@/lib/supabase/server";

export function getSession() {
  const supabase = createClient();

  return supabase.auth.getSession();
}
