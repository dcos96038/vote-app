import { Database } from "@/types/supabase";

export interface InsertParams {
  placeId: Database["public"]["Tables"]["food_places"]["Row"]["id"];
  meetId: Database["public"]["Tables"]["weekly_meets"]["Row"]["id"];
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
}
