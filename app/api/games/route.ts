import { steamApiClient } from "@/lib/server/SteamApiClient";
import errorHandlingMiddleware from "@/lib/errorHandlingMiddleware";
import { ServerError } from "@/lib/errors";
import getParamsObject from "@/lib/getParamsObject";
import getSteamidFromProfileUrl from "@/lib/server/getSteamidFromProfileUrl";
import steamIdSchema from "@/lib/profileUrlSchema";
import { first, orderBy, sum } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GetOwnedGamesResponse } from "@/lib/types";

const paramsSchema = z.object({ profileUrl: steamIdSchema });
type Params = z.infer<typeof paramsSchema>;

const handler = async (req: NextRequest) => {
  let params: Params;

  try {
    params = paramsSchema.parse(getParamsObject(req));
  } catch {
    throw new ServerError(400, "invalid_parameters");
  }

  let steamResponse: GetOwnedGamesResponse;

  try {
    const steamid = await getSteamidFromProfileUrl(params.profileUrl);
    steamResponse = (await steamApiClient.fetchGames(steamid)).response;
  } catch (e) {
    // If we have a valid steamid but the 2nd request fails, we really don't know why.
    // That's because the steam API doesn't return friendly errors when fetching games.
    // This is a best guess.
    throw new ServerError(
      400,
      "invalid_steam_account_url",
      "Could not find your steam account",
    );
  }

  const { games } = steamResponse;
  const total_playtime = sum(games.map((g) => g.playtime_forever));

  const orderedGames = orderBy(
    games,
    ["playtime_forever", "name"],
    ["desc", "asc"],
  );

  if (orderedGames.length) orderedGames[0].most_played = true;

  const data = {
    game_count: steamResponse.game_count,
    total_playtime,
    games: orderedGames,
  };

  return NextResponse.json({ data }, { status: 200 });
};

export const GET = errorHandlingMiddleware(handler);
