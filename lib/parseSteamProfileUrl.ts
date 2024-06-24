export const steamIdRegex = /https?:\/\/steamcommunity\.com\/profiles\/(\d+)/;
export const vanityUrlRegex = /https?:\/\/steamcommunity\.com\/id\/([\w-]+)/;

function parseSteamProfileUrl(url: string) {
  if (steamIdRegex.test(url)) {
    const matches = url.match(steamIdRegex);

    if (matches && matches.length >= 2) {
      return [matches[1], "steamid"] as const;
    }
  } else if (vanityUrlRegex.test(url)) {
    const matches = url.match(vanityUrlRegex);

    if (matches && matches.length >= 2) {
      return [matches[1], "vanityUrl"] as const;
    }
  }

  throw new Error("failed to parse steam profile URL");
}

export default parseSteamProfileUrl;
