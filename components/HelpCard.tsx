import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PropsWithChildren } from "react";
import HelpText from "./HelpText";

const HelpCard = (props: PropsWithChildren) => (
  <HoverCard>
    <HoverCardTrigger asChild>{props.children}</HoverCardTrigger>
    <HoverCardContent className="w-80">
      <p>
        <HelpText />
      </p>
    </HoverCardContent>
  </HoverCard>
);

export default HelpCard;
