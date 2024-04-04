import { DebtTable } from "@/components/debt-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getFoodPlaceScore } from "@/lib/utils/food-places";
import { FoodPlacesService } from "@/services/food-places";
import { WeeklyMeetsService } from "@/services/weekly-meets";
import { FoodPlaceWithValorations } from "@/types/globals";

export default async function Home() {
	const weeklyMeetService = new WeeklyMeetsService(
		createSupabaseServerClient(),
	);
	const foodPlacesService = new FoodPlacesService(createSupabaseServerClient());

	let place: FoodPlaceWithValorations | null = null;

	const weeklyMeet = await weeklyMeetService.getActiveWeeklyMeet();

	if (weeklyMeet.will_occur) {
		const mostVotedPlaceId =
			await weeklyMeetService.getMostVotedPlaceIdFromActiveMeet();
		place = await foodPlacesService.get(mostVotedPlaceId);
	}

	const renderScore = (place: FoodPlaceWithValorations) => {
		if (place.valorations.length === 0) {
			return (
				<div className="text-lg text-muted-foreground">
					Este lugar todavía no tiene votos
				</div>
			);
		}

		const score = getFoodPlaceScore(place);

		return <div className="text-end text-3xl font-medium">{score}/5</div>;
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex-1">
				<div className="text-4xl font-bold">Voterino App</div>
				<div className="text-lg text-muted-foreground">
					Vota y propone lugares para comer culiao!
				</div>
			</div>
			<div className="flex flex-col gap-4 sm:flex-row">
				{place ? (
					<>
						<div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
							<div className="text-xl font-bold">Lugar de esta semana:</div>
							<div className="text-end text-lg text-muted-foreground">
								{place.name} - {place.location}
							</div>
						</div>
						<div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
							<div className="text-xl font-bold">Valoración:</div>
							{renderScore(place)}
						</div>
					</>
				) : (
					<>
						<div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
							<div className="text-xl font-bold">
								No habrá reunión esta semana 🫤
							</div>
						</div>
					</>
				)}
			</div>

			<DebtTable />
		</div>
	);
}
