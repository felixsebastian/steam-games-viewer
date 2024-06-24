import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import HelpText from "./HelpText";
import createPlaytimeSummary from "@/lib/createPlaytimeSummary";
import GameCard from "./GameCard";
import fetchGames from "@/lib/fetchGames";

interface Props {
  profileUrl: string;
}

const Results = async ({ profileUrl }: Props) => {
  try {
    const data = await fetchGames(profileUrl);

    return (
      <div className="grid gap-4">
        <div>
          <p className="text-lg font-bold tracking-tight lg:text-xl">
            {data.game_count} games in library
          </p>
          <p className="tracking-tight text-md text-muted-foreground">
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
    if (typeof error !== "object") throw error;

    return (
      <Alert>
        <AlertTitle>Could not analyse steam account</AlertTitle>
        <AlertDescription>
          Make sure the profile URL is correct. <HelpText />
        </AlertDescription>
      </Alert>
    );
  }
};

export default Results;
