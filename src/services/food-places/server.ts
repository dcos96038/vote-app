import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getFoodPlaces = async () => {
  const supabase = createSupabaseServerClient();
  const response = await supabase.from("food_places").select("*").filter("verified", "eq", true)
  if (response.error) {
    throw response.error;
  }
  return response.data;
};
