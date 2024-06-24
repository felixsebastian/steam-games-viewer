import { OwnedGame } from "@/lib/types";
import Image from "next/image";

const SteamThumbnail = (props: OwnedGame) => (
  <div className="rounded overflow-hidden">
    <Image
      alt={props.name}
      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`}
      width={24}
      height={24}
    />
  </div>
);

export default SteamThumbnail;
