import { GamesResponse } from "./types";

class FailedToFetchError extends Error {}

const fetchGames =
  (steamid: string, limit: number, offset: number) => async () => {
    const res = await fetch(
      "http://localhost:3000/api/games?" +
        new URLSearchParams({
          steamid,
          limit: limit.toString(),
          offset: offset.toString(),
        }),
    );

    if (!res.ok) throw new FailedToFetchError("failed to fetch games");
    const json: GamesResponse = await res.json();
    return json;
  };

export default fetchGames;
