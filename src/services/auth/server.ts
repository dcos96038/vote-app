import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore } from "next/cache";

export function getSession() {
  unstable_noStore();
  const supabase = createSupabaseServerClient();

  return supabase.auth.getSession();
}

export async function getUser() {
  const supabase = createSupabaseServerClient();

  const userResponse = await supabase.auth.getUser();

  return userResponse.data.user;
}
