import SteamApiClient from "@/lib/SteamApiClient";
import errorHandlingMiddleware from "@/lib/errorHandlingMiddleware";
import getParamsObject from "@/lib/getParamsObject";
import steamIdSchema from "@/lib/steamIdSchema";
import { orderBy, sum } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const steam = new SteamApiClient();
const paramsSchema = z.object({ steamid: steamIdSchema });
type Params = z.infer<typeof paramsSchema>;

const handler = async (req: NextRequest) => {
  let params: Params;

  try {
    params = paramsSchema.parse(getParamsObject(req));
  } catch {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const {
    response: { game_count, games },
  } = await steam.fetchGames(params.steamid);

  const total_playtime = sum(games.map((g) => g.playtime_forever));

  const orderedGames = orderBy(
    games,
    ["playtime_forever", "name"],
    ["desc", "asc"],
  );

  return NextResponse.json(
    { data: { game_count, total_playtime, games: orderedGames } },
    { status: 200 },
  );
};

export const GET = errorHandlingMiddleware(handler);
