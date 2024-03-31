import { createSupabaseFrontendClient } from "@/lib/supabase/client";
import { InsertParams } from "./types";

const getWeeklyVotesTable = () => {
  const supabase = createSupabaseFrontendClient();

  return supabase.from("weekly_votes");
};

export const weeklyVotesClientService = {
  insert: async ({ placeId, meetId, userId }: InsertParams) => {
    const weeklyVotes = getWeeklyVotesTable();

    const response = await weeklyVotes.insert([
      { place: placeId, meet: meetId, user: userId },
    ]);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
};
