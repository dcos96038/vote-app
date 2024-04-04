import { DebtTable } from "@/components/debt-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FoodPlacesService } from "@/services/food-places";
import { WeeklyMeetsService } from "@/services/weekly-meets";

export default async function Home() {
	const weeklyMeetService = new WeeklyMeetsService(
		createSupabaseServerClient(),
	);
	const foodPlacesService = new FoodPlacesService(createSupabaseServerClient());

	let place: {
		name: string;
		location: string;
		score: number;
	} | null = null;

	const weeklyMeet = await weeklyMeetService.getActiveWeeklyMeet();

	if (weeklyMeet.will_occur) {
		const mostVotedPlaceId =
			await weeklyMeetService.getMostVotedPlaceIdFromActiveMeet();
		place = await foodPlacesService.get(mostVotedPlaceId);
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex-1">
				<div className="text-4xl font-bold">Voterino App</div>
				<div className="text-lg text-muted-foreground">
					Vota y propone lugares para comer culiao!
				</div>
			</div>
			<div className="flex flex-col gap-4 sm:flex-row">
				{weeklyMeet.will_occur ? (
					<>
						<div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
							<div className="text-xl font-bold">Lugar de esta semana:</div>
							<div className="text-end text-lg text-muted-foreground">
								{place?.name} - {place?.location}
							</div>
						</div>
						<div className="flex flex-1 flex-col justify-between gap-4 rounded-lg border-2 p-5 transition-colors hover:bg-slate-100/10">
							<div className="text-xl font-bold">Valoración:</div>
							{place && place.score > 0 ? (
								<div className="text-end text-3xl font-medium">
									{place?.score}/5
								</div>
							) : (
								<div className="text-lg text-muted-foreground">
									Este lugar todavía no tiene votos
								</div>
							)}
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
