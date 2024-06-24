"use client";
import createPlaytimeSummary from "@/lib/createPlaytimeSummary";
import GameCard from "./GameCard";
import { GamesResponse } from "@/lib/types";

interface Props {
  data: GamesResponse;
}

const Results = ({ data }: Props) => (
  <div className="grid gap-4">
    <div>
      <p className="text-lg font-bold tracking-tight lg:text-xl">
        {data.game_count} games in library
      </p>
      <p className="text-md tracking-tight lg:text-lg">
        {createPlaytimeSummary(data.total_playtime).join(", ")} total playtime
      </p>
    </div>
    <div className="grid lg:grid-cols-2 gap-4">
      {data.games.map((game, i) => (
        <GameCard key={game.appid} game={game} mostPlayed={i === 0} />
      ))}
    </div>
  </div>
);

export default Results;
