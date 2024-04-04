import { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";

import { Database } from "./supabase";

export type SupabaseClient = SupabaseClientType<Database, "public">;

export type WeeklyVote = Database["public"]["Tables"]["weekly_votes"]["Row"];
export type InsertWeeklyVote =
	Database["public"]["Tables"]["weekly_votes"]["Insert"];

export type WeeklyMeet = Database["public"]["Tables"]["weekly_meets"]["Row"];
export type InsertWeeklyMeet =
	Database["public"]["Tables"]["weekly_meets"]["Insert"];

export type FoodPlace = Database["public"]["Tables"]["food_places"]["Row"];
export type InsertFoodPlace =
	Database["public"]["Tables"]["food_places"]["Insert"];
export type FoodPlaceWithValorations = FoodPlace & {
	valorations: Valoration[];
};

export type User = Database["public"]["Tables"]["users"]["Row"];
export type InsertUser = Database["public"]["Tables"]["users"]["Insert"];

export type Bill = Database["public"]["Tables"]["bills"]["Row"];
export type InsertBill = Database["public"]["Tables"]["bills"]["Insert"];

export type UserBill = Database["public"]["Tables"]["users_bills"]["Row"];
export type InsertUserBill =
	Database["public"]["Tables"]["users_bills"]["Insert"];

export type UserAttendance =
	Database["public"]["Tables"]["users_attendances"]["Row"];
export type InsertUserAttendance =
	Database["public"]["Tables"]["users_attendances"]["Insert"];

export type Valoration = Database["public"]["Tables"]["valorations"]["Row"];
export type InsertValoration =
	Database["public"]["Tables"]["valorations"]["Insert"];
