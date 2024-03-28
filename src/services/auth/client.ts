import { createSupabaseFrontendClient } from "@/lib/supabase/client";

export async function signOut() {
  const supabase = createSupabaseFrontendClient();

  await supabase.auth.signOut();
}

export async function signInWithGoogle() {
  const supabase = createSupabaseFrontendClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function getUser() {
  const supabase = createSupabaseFrontendClient();

  const userResponse = await supabase.auth.getUser();

  if (userResponse.error) {
    throw new Error(userResponse.error.message);
  }

  return userResponse.data.user;
}
