import { InsertWeeklyVote, SupabaseClient } from "@/types/globals";

export class WeeklyVotesService {
	private readonly table;

	constructor(private readonly client: SupabaseClient) {
		this.table = this.client.from("weekly_votes");
	}

	async insert({ place, meet, user }: InsertWeeklyVote) {
		await this.table.insert({ place, meet, user });
	}

	async update({ place, meet, user }: InsertWeeklyVote) {
		await this.table.update({ place }).match({ user, meet });
	}
}
