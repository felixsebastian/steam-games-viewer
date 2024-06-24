import SteamApiClient from "@/lib/SteamApiClient";
import errorHandlingMiddleware from "@/lib/errorHandlingMiddleware";
import steamIdSchema from "@/lib/steamIdSchema";
import { ApiResponse, GamesResponse } from "@/lib/types";
import { orderBy, sum } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const steam = new SteamApiClient();
const paramsSchema = z.object({ steamid: steamIdSchema });

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GamesResponse>>,
) => {
  let params: z.infer<typeof paramsSchema>;

  try {
    params = paramsSchema.parse(req.query);
  } catch {
    res.status(400).json({ error: "Invalid parameters" });
    return;
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

  res.status(200).json({
    data: {
      game_count,
      total_playtime,
      games: orderedGames,
    },
  });
};

export default errorHandlingMiddleware(handler);
