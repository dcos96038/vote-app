import { foodPlacesServerService } from "@/services/food-places/server";
import { VoteClientPage } from "./page.client";
import { weeklyMeetsServerService } from "@/services/weekly-meets/server";
import { authServerService } from "@/services/auth/server";

async function VotePage() {
  const [weeklyMeet, options, user] = await Promise.all([
    weeklyMeetsServerService.getCurrentWeeklyMeet(),
    foodPlacesServerService.getVerifiedsForVotations(),
    authServerService.getDBUser(),
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
