import { InsertWeeklyVote } from "@/types/globals";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class WeeklyVotesService {
  private readonly table;

  constructor(private readonly client: SupabaseClient<Database, "public">) {
    this.table = this.client.from("weekly_votes");
  }

  async insert({ place, meet }: InsertWeeklyVote) {
    await this.table.insert({ place, meet });
  }
}
