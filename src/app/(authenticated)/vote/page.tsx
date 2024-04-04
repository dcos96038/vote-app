import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth";
import { FoodPlacesService } from "@/services/food-places";
import { WeeklyMeetsService } from "@/services/weekly-meets";

import { VoteClientPage } from "./page.client";

async function VotePage() {
	const weeklyMeetsService = new WeeklyMeetsService(
		createSupabaseServerClient(),
	);
	const foodPlacesService = new FoodPlacesService(createSupabaseServerClient());
	const authService = new AuthService(createSupabaseServerClient());

	const [weeklyMeet, options, user] = await Promise.all([
		weeklyMeetsService.getActiveWeeklyMeet(),
		foodPlacesService.getVerifiedsForVotations(),
		authService.getDBUser(),
	]);

	const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);

	if (!weeklyMeet.will_occur) {
		return <h1>La votación aún no ha comenzado o no hay quorum {":("}</h1>;
	}

	if (!user) {
		throw new Error("No se encontró el usuario");
	}

	return (
		<div className="flex flex-col gap-10">
			<h1 className="text-center text-4xl font-bold">Votación de la semana</h1>
			<VoteClientPage
				user={user}
				weeklyMeet={weeklyMeet}
				options={options}
				totalVotes={totalVotes}
			/>
		</div>
	);
}

export default VotePage;
