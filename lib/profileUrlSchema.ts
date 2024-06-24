import { z } from "zod";
import { steamIdRegex, vanityUrlRegex } from "./parseSteamProfileUrl";

const profileUrlSchema = z.union([
  z.string().regex(steamIdRegex),
  z.string().regex(vanityUrlRegex),
]);

export default profileUrlSchema;
