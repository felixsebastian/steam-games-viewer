import parseSteamProfileUrl from "../parseSteamProfileUrl";
import { InvalidSteamUrlError } from "../errors";
import { steamApiClient } from "./SteamApiClient";

const getSteamidFromProfileUrl = async (profileUrl: string) => {
  const [value, status] = parseSteamProfileUrl(profileUrl);

  if (status === "vanityUrl") {
    const res = await steamApiClient.getSteamIdFromVanityUrl(value);
    if (res.response.success !== 1) throw new InvalidSteamUrlError();
    return res.response.steamid;
  } else {
    return value;
  }
};

export default getSteamidFromProfileUrl;
