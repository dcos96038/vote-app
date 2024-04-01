import { Database } from "./supabase";

export type WeeklyVote = Database["public"]["Tables"]["weekly_votes"]["Row"];
export type WeeklyMeet = Database["public"]["Tables"]["weekly_meets"]["Row"];
export type FoodPlace = Database["public"]["Tables"]["food_places"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Bill = Database["public"]["Tables"]["bills"]["Row"];
export type UserBill = Database["public"]["Tables"]["users_bills"]["Row"];
export type UserAttendance =
  Database["public"]["Tables"]["users_attendances"]["Row"];
export type Valoration = Database["public"]["Tables"]["valorations"]["Row"];
