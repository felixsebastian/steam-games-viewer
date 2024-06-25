import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Playtime from "@/components/Playtime";
import SteamThumbnail from "@/components/SteamThumbnail";
import { Badge } from "./ui/badge";
import { TrophyIcon } from "lucide-react";
import { OwnedGame } from "@/lib/types";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { TooltipContent } from "./ui/tooltip";
import Link from "next/link";

interface Props {
  game: OwnedGame;
}

const GameCard = ({ game }: Props) => (
  <Link href={`https://steamcommunity.com/app/${game.appid}`} target="_blank">
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col items-start gap-2">
            <CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-left w-min max-w-64 lg:max-w-80 block overflow-x-hidden leading-8 whitespace-nowrap text-ellipsis">
                    {game.name}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{game.name}</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Playtime minutes={game.playtime_forever} />
              {game.most_played && (
                <Badge variant="outline">
                  <span className="flex gap-1 items-center">
                    <TrophyIcon size={12} /> Most played
                  </span>
                </Badge>
              )}
            </div>
          </div>
          <SteamThumbnail {...game} />
        </div>
      </CardHeader>
    </Card>
  </Link>
);

export default GameCard;
