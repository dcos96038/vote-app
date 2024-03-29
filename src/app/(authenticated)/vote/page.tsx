"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const OPTIONS = [
  {
    name: "Los Electricos",
    score: 10,
  },
  {
    name: "Don Pete",
    score: 2,
  },
  {
    name: "El Torito",
    score: 5,
  },
];

function VotePage() {
  const [selected, setSelected] = useState(null);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const totalVotes = OPTIONS.reduce((acc, opt) => acc + opt.score, 0);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-4xl font-bold">Votación de la semana</h1>
      <div className="flex flex-col gap-4">
        <fieldset
          onChange={(e) => {
            setSelected((e.target as any).value);
          }}
          className="flex flex-col gap-3"
          disabled={alreadyVoted}
        >
          {OPTIONS.map((o) => (
            <label
              key={o.name}
              className={cn(
                "flex relative overflow-hidden w-full items-center gap-3 rounded-md border py-4 transition-colors",
                {
                  "outline-green-500 outline": selected === o.name,
                  "hover:bg-slate-100/20 cursor-pointer":
                    selected !== o.name && !alreadyVoted,
                },
              )}
            >
              <div
                className={cn("absolute h-full transition-all", {
                  "bg-green-500/50": selected === o.name,
                  "bg-slate-200/20": selected !== o.name,
                })}
                style={{
                  width: `${alreadyVoted ? (o.score * 100) / totalVotes : 0}%`,
                }}
              />
              {alreadyVoted && (
                <div className="absolute flex size-full items-center justify-center">
                  {Math.round((o.score * 100) / totalVotes)}%
                </div>
              )}
              <input
                className="hidden"
                type="radio"
                name="food_place"
                id={o.name}
                value={o.name}
              />
              <span className="px-6">{o.name}</span>
            </label>
          ))}
        </fieldset>
        <Button disabled={alreadyVoted} onClick={() => setAlreadyVoted(true)}>
          Votar!
        </Button>
      </div>
    </div>
  );
}

export default VotePage;
