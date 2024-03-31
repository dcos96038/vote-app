import { createSupabaseFrontendClient } from "@/lib/supabase/client";

async function signOut() {
  const supabase = createSupabaseFrontendClient();

  await supabase.auth.signOut();
}

async function signInWithGoogle() {
  const supabase = createSupabaseFrontendClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export const authClientService = {
  signOut,
  signInWithGoogle,
};
