import { createSupabaseServerClient } from "@/lib/supabase/server";

const getWeeklyMeetsTable = () => {
  const supabase = createSupabaseServerClient();

  return supabase.from("weekly_meets");
};

export const weeklyMeetsServerService = {
  get: async (id: string) => {
    const weeklyMeets = getWeeklyMeetsTable();

    const response = await weeklyMeets.select("*").eq("id", id);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
  getAll: async () => {
    const weeklyMeets = getWeeklyMeetsTable();

    const response = await weeklyMeets.select("*");

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
  getCurrentWeeklyMeet: async () => {
    const weeklyMeets = getWeeklyMeetsTable();

    const response = await weeklyMeets
      .select(`*, weekly_votes(*)`)
      .order("date", { ascending: false })
      .limit(1);

    if (response.error) {
      throw response.error;
    }

    return response.data[0];
  },
};
