import { Database } from "./supabase";

export type WeeklyVotes = Database["public"]["Tables"]["weekly_votes"]["Row"];
export type WeeklyMeets = Database["public"]["Tables"]["weekly_meets"]["Row"];
export type FoodPlaces = Database["public"]["Tables"]["food_places"]["Row"];
export type Users = Database["public"]["Tables"]["users"]["Row"];
