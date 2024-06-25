import { ApiError } from "../errors";
import { ApiResponse, GamesResponse } from "../types";

const fetchGames = (profileUrl: string) => async () => {
  const searchParams = new URLSearchParams({ profileUrl });

  try {
    const res = await fetch(`/api/games?${searchParams}`);
    const json: ApiResponse<GamesResponse> = await res.json();
    if (!res.ok) throw new ApiError(json.error?.code, json.error?.message);
    return json.data;
  } catch (e) {
    console.error(e);
    if (e instanceof ApiError) throw e;
    throw new ApiError();
  }
};

export default fetchGames;
