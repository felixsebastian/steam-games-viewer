import { GamesResponse } from "./types";

class FailedToFetchError extends Error {}
const apiBaseUrl = process.env.API_BASE_URL ?? "";

const fetchGames = async (profileUrl: string) => {
  const searchParams = new URLSearchParams({ profileUrl });
  const res = await fetch(`${apiBaseUrl}/games?${searchParams}`);
  if (!res.ok) throw new FailedToFetchError("failed to fetch games");
  const json: GamesResponse = await res.json();
  return json;
};

export default fetchGames;
