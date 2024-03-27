import { createClient } from "@/lib/supabase/server";

export const getFoodPlaces = async () => {
  const supabase = createClient();
  const response = await supabase.from("food_places").select("*");
  if (response.error) {
    throw response.error;
  }
  return response.data;
};
