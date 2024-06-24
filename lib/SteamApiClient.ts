import { GetOwnedGamesResponse, SteamApiResponse } from "./types";

const baseUrl = "http://api.steampowered.com";

export class SteamApiClient {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  baseFetch(endpoint: string, params?: Record<string, unknown>) {
    return fetch(
      `${baseUrl}${endpoint}?` +
        new URLSearchParams({
          key: this.apiKey,
          format: "json",
          ...params,
        }),
    );
  }

  async getSteamIdFromVanityUrl(vanityurl: string) {
    const response = await this.baseFetch(
      "/ISteamUser/ResolveVanityURL/v0001/",
      { vanityurl },
    );

    return await response.json();
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
