"use client";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import HelpText from "./HelpText";
import createPlaytimeSummary from "@/lib/createPlaytimeSummary";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import { useState } from "react";
import useResults from "@/lib/client/useResults";

interface Props {
  profileUrl: string;
}

const pageSize = 6;

const Results = (props: Props) => {
  const { data, error } = useResults(props.profileUrl);
  const [page, setPage] = useState(1);

  if (error) {
    return (
      <Alert>
        <AlertTitle>{error.message}</AlertTitle>
        <AlertDescription>
          Make sure the profile URL is correct. <HelpText />
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) return null;

  return (
    <div className="grid gap-4">
      <div>
        <p className="text-lg font-bold tracking-tight lg:text-xl">
          {data.game_count} games in library
        </p>
        <p className="tracking-tight text-md text-muted-foreground">
          {createPlaytimeSummary(data.total_playtime).join(", ")} total playtime
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {data.games
          .slice((page - 1) * pageSize, page * pageSize)
          .map((game) => (
            <GameCard key={game.appid} game={game} />
          ))}
      </div>
      <Pagination
        page={page}
        onPageChange={setPage}
        numberOfPages={Math.ceil(data.games.length / pageSize)}
      />
    </div>
  );
};

export default Results;
