import { z } from "zod";
import { steamIdRegex, vanityUrlRegex } from "./parseSteamProfileUrl";

const profileUrlSchema = z.union([
  z.string().regex(steamIdRegex, { message: "Must be a valid steam URL" }),
  z.string().regex(vanityUrlRegex, { message: "Must be a valid steam URL" }),
]);

export default profileUrlSchema;
