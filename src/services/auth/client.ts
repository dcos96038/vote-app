import { createClient } from "@/lib/supabase/client";

export function signOut() {
  const supabase = createClient();

  return supabase.auth.signOut();
}
