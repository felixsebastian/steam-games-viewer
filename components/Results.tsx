import { PropsWithParams } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import HelpText from "./HelpText";
import createPlaytimeSummary from "@/lib/createPlaytimeSummary";
import GameCard from "./GameCard";
import fetchGames from "@/lib/fetchGames";

const Results = async (props: PropsWithParams) => {
  const { steamid } = props.params;

  try {
    const data = await fetchGames(steamid);

    return (
      <div className="grid gap-4">
        <div>
          <p className="text-lg font-bold tracking-tight lg:text-xl">
            {data.game_count} games in library
          </p>
          <p className="text-md tracking-tight lg:text-lg">
            {createPlaytimeSummary(data.total_playtime).join(", ")} total
            playtime
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {data.games.map((game, i) => (
            <GameCard key={game.appid} game={game} mostPlayed={i === 0} />
          ))}
        </div>
      </div>
    );
  } catch (error: unknown) {
    if (typeof error === "object")
      return (
        <Alert>
          <AlertTitle>Could not analyse steam account</AlertTitle>
          <AlertDescription>
            Check the steam ID to make sure it is correct. <HelpText />
          </AlertDescription>
        </Alert>
      );
  }
};

export default Results;
