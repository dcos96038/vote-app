import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

interface InsertParams {
  placeId: Database["public"]["Tables"]["food_places"]["Row"]["id"];
  meetId: Database["public"]["Tables"]["weekly_meets"]["Row"]["id"];
}

const getWeeklyVotesTable = () => {
  const supabase = createSupabaseServerClient();

  return supabase.from("weekly_votes");
};

export const weeklyVotesServerService = {
  insert: async ({ placeId, meetId }: InsertParams) => {
    const weeklyVotes = getWeeklyVotesTable();

    const response = await weeklyVotes.insert([
      { place: placeId, meet: meetId },
    ]);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
};
