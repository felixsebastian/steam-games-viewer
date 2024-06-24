import { SteamApiClient } from "@/lib/SteamApiClient";
import errorHandlingMiddleware from "@/lib/errorHandlingMiddleware";
import getParamsObject from "@/lib/getParamsObject";
import parseSteamProfileUrl from "@/lib/parseSteamProfileUrl";
import steamIdSchema from "@/lib/profileUrlSchema";
import { orderBy, sum } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const steamClient = new SteamApiClient(process.env.STEAM_API_KEY ?? "");
const paramsSchema = z.object({ profileUrl: steamIdSchema });
type Params = z.infer<typeof paramsSchema>;

const handler = async (req: NextRequest) => {
  let params: Params;

  try {
    params = paramsSchema.parse(getParamsObject(req));
  } catch {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const [value, status] = parseSteamProfileUrl(params.profileUrl);
  let steamid = "";

  if (status === "vanityUrl") {
    const r = await steamClient.getSteamIdFromVanityUrl(value);
    steamid = r.response.steamid;
  } else {
    steamid = value;
  }

  const {
    response: { game_count, games },
  } = await steamClient.fetchGames(steamid);

  const total_playtime = sum(games.map((g) => g.playtime_forever));

  const orderedGames = orderBy(
    games,
    ["playtime_forever", "name"],
    ["desc", "asc"],
  );

  return NextResponse.json(
    { game_count, total_playtime, games: orderedGames },
    { status: 200 },
  );
};

export const GET = errorHandlingMiddleware(handler);
