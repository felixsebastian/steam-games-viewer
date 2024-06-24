import { OwnedGame } from "@/lib/types";
import Image from "next/image";

const SteamThumbnail = (props: OwnedGame) => (
  <Image
    alt={props.name}
    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`}
    width={30}
    height={30}
  />
);

export default SteamThumbnail;
