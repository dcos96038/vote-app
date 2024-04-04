"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { WeeklyVotesService } from "@/services/weekly-votes";
import { revalidatePath } from "next/cache";

export async function voteForPlace(place: string, user: string, meet: number) {
	const weeklyVotesService = new WeeklyVotesService(
		createSupabaseServerClient(),
	);

	try {
		await weeklyVotesService.insert({
			meet,
			place,
			user,
		});

		revalidatePath("/home");
		revalidatePath("/vote");
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateVoteForPlace(
	place: string,
	user: string,
	meet: number,
) {
	const weeklyVotesService = new WeeklyVotesService(
		createSupabaseServerClient(),
	);

	try {
		const response = await weeklyVotesService.update({
			meet,
			place,
			user,
		});

		if (response.error) {
			throw response.error;
		}

		revalidatePath("/home");
		revalidatePath("/vote");
	} catch (error) {
		console.error(error);
		throw error;
	}
}
