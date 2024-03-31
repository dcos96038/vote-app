import { createSupabaseServerClient } from "@/lib/supabase/server";

const getFoodPlacesTable = () => {
  const supabase = createSupabaseServerClient();
  return supabase.from("food_places");
};

export const foodPlacesServerService = {
  getVerifieds: async () => {
    const response = await getFoodPlacesTable()
      .select("*")
      .filter("verified", "eq", true);

    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
  getVerifiedsForVotations: async () => {
    const response = await getFoodPlacesTable()
      .select(`id, name, valorations (id, score), weekly_votes (id, place)`)
      .eq("verified", true);

    if (response.error) {
      throw response.error;
    }

    const formattedData = response.data.map((p) => ({
      id: p.id,
      name: p.name,
      score: p.valorations.reduce((acc, v) => acc + (v.score ?? 0), 0),
      votes: p.weekly_votes.filter((v) => v.place === p.id).length,
    }));

    return formattedData;
  },
};
