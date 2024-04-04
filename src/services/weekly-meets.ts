import { SupabaseClient } from "@/types/globals";

export class WeeklyMeetsService {
	private readonly table;

	constructor(private readonly client: SupabaseClient) {
		this.table = this.client.from("weekly_meets");
	}

	async getActiveWeeklyMeet() {
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

	async getMostVotedPlaceIdFromActiveMeet() {
		const activeWeeklyMeet = await this.getActiveWeeklyMeet();

		const weeklyVotes = activeWeeklyMeet.weekly_votes;

		const votesById: Record<string, number> = {};

		for (const vote of weeklyVotes) {
			const placeId = vote.place;
			votesById[placeId] = (votesById[placeId] || 0) + 1;
		}

		const mostVotedPlaceId = Object.entries(votesById).reduce(
			(acc, [id, votes]) => {
				if (votes > acc.votes) {
					return { id, votes };
				}

				return acc;
			},
			{ id: "", votes: 0 },
		).id;

		return mostVotedPlaceId;
	}
}
