import base64 from "base-64";
import utf8 from "utf8";

export const encodeProfileUrl = (profileUrl: string) =>
  encodeURIComponent(base64.encode(utf8.encode(profileUrl)));

export const decodeProfileUrl = (encodedProfileUrl: string) =>
  utf8.decode(base64.decode(decodeURIComponent(encodedProfileUrl)));
