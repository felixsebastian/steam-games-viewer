import { GetOwnedGamesResponse, SteamApiResponse } from "./types";

const baseUrl = "http://api.steampowered.com";

class SteamApiClient {
  baseFetch(endpoint: string, params?: Record<string, unknown>) {
    return fetch(
      `${baseUrl}${endpoint}?` +
        new URLSearchParams({
          key: process.env.STEAM_API_KEY ?? "",
          format: "json",
          ...params,
        }),
    );
  }

  async fetchGames(
    steamid: string,
  ): Promise<SteamApiResponse<GetOwnedGamesResponse>> {
    const response = await this.baseFetch(
      "/IPlayerService/GetOwnedGames/v0001/",
      {
        include_appinfo: true,
        include_played_free_games: false,
        steamid,
      },
    );

    return await response.json();
  }
}

export default SteamApiClient;
