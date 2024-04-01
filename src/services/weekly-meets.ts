import { SupabaseClient } from "@/types/globals";

export class WeeklyMeetsService {
  private readonly table;

  constructor(private readonly client: SupabaseClient) {
    this.table = this.client.from("weekly_meets");
  }

  async getCurrentWeeklyMeet() {
    const response = await this.table
      .select(`*, weekly_votes(*)`)
      .order("date", { ascending: false })
      .limit(1)
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }
}
