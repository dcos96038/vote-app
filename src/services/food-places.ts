import { SupabaseClient } from "@/types/globals";

export class FoodPlacesService {
	private readonly table;

	constructor(private readonly client: SupabaseClient) {
		this.table = this.client.from("food_places");
	}

	async getVerifieds() {
		const response = await this.table
			.select("*")
			.filter("verified", "eq", true);

		if (response.error) {
			throw response.error;
		}
		return response.data;
	}

	async getVerifiedsForVotations() {
		const response = await this.table
			.select(`id, name, valorations (id, score), weekly_votes (id, place)`)
			.eq("verified", true);

		if (response.error) {
			throw response.error;
		}

		const formattedData = response.data.map((p) => ({
			id: p.id,
			name: p.name,
			score: p.valorations.reduce((acc, v) => acc + (v.score ?? 0), 0),
			votes: p.weekly_votes.filter((v) => v.place === p.id).length,
		}));

		return formattedData;
	}
}
