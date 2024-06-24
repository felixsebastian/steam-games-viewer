import SteamApiClient from "@/lib/SteamApiClient";
import { GamesResponse } from "@/lib/types";
import { orderBy, sum } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const steam = new SteamApiClient();

const paramsSchema = z.object({
  steamid: z.string().min(2),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GamesResponse>,
) {
  const params = paramsSchema.parse(req.query);

  const {
    response: { game_count, games },
  } = await steam.fetchGames(params.steamid);

  const orderedGames = orderBy(
    games,
    ["playtime_forever", "name"],
    ["desc", "asc"],
  );

  res.status(200).json({
    game_count,
    total_playtime: sum(games.map((g) => g.playtime_forever)),
    games: orderedGames,
  });
}
