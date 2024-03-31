import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore } from "next/cache";

export const authServerService = {
  getSession: () => {
    unstable_noStore();
    const supabase = createSupabaseServerClient();

    return supabase.auth.getSession();
  },
  getSupabaseUser: async () => {
    const supabase = createSupabaseServerClient();

    const userResponse = await supabase.auth.getUser();

    return userResponse.data.user;
  },
  getDBUser: async () => {
    const supabase = createSupabaseServerClient();
    const supabaseUser = await supabase.auth.getUser();

    if (!supabaseUser) {
      return null;
    }

    const userResponse = await supabase
      .from("users")
      .select(`*`)
      .eq("base_user", supabaseUser.data.user?.id || "")
      .single();

    if (userResponse.error) {
      return null;
    }

    return userResponse.data;
  },
};
