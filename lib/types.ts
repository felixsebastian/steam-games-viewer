import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface OwnedGame {
  appid: number;
  name: string;
  img_icon_url: string;
  playtime_deck_forever: number;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
}

export interface GetOwnedGamesResponse {
  game_count: number;
  games: OwnedGame[];
}

export interface SteamApiResponse<T> {
  response: T;
}

export interface GamesResponse extends GetOwnedGamesResponse {
  total_playtime: number;
}

export interface PropsWithParams {
  params: Params;
}
