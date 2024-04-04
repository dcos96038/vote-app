"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils/globals";
import { User, WeeklyMeet, WeeklyVote } from "@/types/globals";

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
	userSelectedPlace: string | null;
	updateVoteForPlace: (
		place: string,
		user: string,
		meet: number,
	) => Promise<void>;
	voteForPlace: (place: string, user: string, meet: number) => Promise<void>;
}

export const VoteClientPage: React.FC<VoteClientPage> = ({
	options,
	totalVotes,
	weeklyMeet,
	user,
	userSelectedPlace,
	updateVoteForPlace,
	voteForPlace,
}) => {
	const alreadyVoted = !!userSelectedPlace;

	const [canVote, setCanVote] = useState(!alreadyVoted);

	const [selectedOption, setSelectedOption] = useState<string | null>(
		userSelectedPlace,
	);
	const [loading, setLoading] = useState(false);

	const handleVote = async () => {
		if (!canVote) return;
		if (!selectedOption) return;

		setLoading(true);

		try {
			if (alreadyVoted) {
				await updateVoteForPlace(selectedOption, user.id, weeklyMeet.id);
				toast.success("Voto actualizado exitosamente!");
			} else {
				await voteForPlace(selectedOption, user.id, weeklyMeet.id);
				toast.success("Votaste exitosamente!");
			}
		} catch (error) {
			console.log(error);
			toast.error("Ocurrió un error al votar");
		} finally {
			setLoading(false);
		}
	};

	const renderActionButton = () => {
		if (!alreadyVoted) {
			return (
				<Button disabled={loading} onClick={handleVote}>
					{loading ? <Spinner /> : "Votar!"}
				</Button>
			);
		}

		if (canVote) {
			return (
				<Button disabled={loading} onClick={handleVote}>
					{loading ? <Spinner /> : "Votar"}
				</Button>
			);
		}
		return (
			<Button disabled={loading} onClick={() => setCanVote(true)}>
				Cambiar Voto!
			</Button>
		);
	};

	useEffect(() => {
		if (userSelectedPlace) {
			setCanVote(false);
		}
	}, [userSelectedPlace, options]);

	return (
		<div className="flex flex-col gap-4">
			<fieldset
				onChange={(e) => {
					setSelectedOption((e.target as HTMLInputElement).value);
				}}
				className="flex flex-col gap-3"
				disabled={!canVote || loading}
			>
				{options.map((o) => (
					<label
						key={o.name}
						className={cn(
							"relative flex w-full items-center gap-3 overflow-hidden rounded-md border py-4 transition-colors",
							{
								"outline outline-green-500": selectedOption === o.id,
								"cursor-pointer hover:bg-slate-100/20":
									selectedOption !== o.id && canVote,
							},
						)}
					>
						<div
							className={cn("absolute h-full transition-all", {
								"bg-green-500/50": selectedOption === o.id,
								"bg-slate-200/20": selectedOption !== o.id,
							})}
							style={{
								width: `${!canVote ? (o.votes * 100) / totalVotes : 0}%`,
							}}
						/>
						{!canVote && (
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
			{renderActionButton()}
		</div>
	);
};
