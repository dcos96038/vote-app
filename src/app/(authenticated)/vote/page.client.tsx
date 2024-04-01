"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { weeklyVotesClientService } from "@/services/weekly-votes/client";
import { User, WeeklyMeet, WeeklyVote } from "@/types/globals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Option {
  id: string;
  name: string;
  votes: number;
  score: number;
}

interface VoteClientPage {
  totalVotes: number;
  options: Option[];
  weeklyMeet: WeeklyMeet & {
    weekly_votes: WeeklyVote[];
  };
  user: User;
}

export const VoteClientPage: React.FC<VoteClientPage> = ({
  options,
  totalVotes,
  weeklyMeet,
  user,
}) => {
  const userVote = weeklyMeet.weekly_votes.find(
    (vote) => vote.user === user.id,
  );

  const alreadyVoted = !!userVote;

  const [selected, setSelected] = useState<string | null>(
    userVote ? userVote.place : null,
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVote = async () => {
    if (alreadyVoted) return;
    if (!selected) return;

    setLoading(true);

    try {
      await weeklyVotesClientService.insert({
        meetId: weeklyMeet.id,
        placeId: selected,
        userId: user.id,
      });

      toast.success("Votaste exitosamente!");

      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error al votar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <fieldset
        onChange={(e) => {
          setSelected((e.target as any).value);
        }}
        className="flex flex-col gap-3"
        disabled={alreadyVoted || loading}
      >
        {options.map((o) => (
          <label
            key={o.name}
            className={cn(
              "flex relative overflow-hidden w-full items-center gap-3 rounded-md border py-4 transition-colors",
              {
                "outline-green-500 outline": selected === o.id,
                "hover:bg-slate-100/20 cursor-pointer":
                  selected !== o.id && !alreadyVoted,
              },
            )}
          >
            <div
              className={cn("absolute h-full transition-all", {
                "bg-green-500/50": selected === o.id,
                "bg-slate-200/20": selected !== o.id,
              })}
              style={{
                width: `${alreadyVoted ? (o.votes * 100) / totalVotes : 0}%`,
              }}
            />
            {alreadyVoted && (
              <div className="absolute flex size-full items-center justify-end px-6">
                {Math.round((o.votes * 100) / totalVotes)}%
              </div>
            )}
            <input
              className="hidden"
              type="radio"
              name="food_place"
              id={o.name}
              value={o.id}
            />
            <span className="px-6">{o.name}</span>
          </label>
        ))}
      </fieldset>
      <Button disabled={alreadyVoted || loading} onClick={handleVote}>
        {loading ? <Spinner /> : "Votar!"}
      </Button>
    </div>
  );
};
