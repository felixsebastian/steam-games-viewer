import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PropsWithChildren } from "react";

const Providers = (props: PropsWithChildren) => (
  <TooltipProvider>{props.children}</TooltipProvider>
);

export default Providers;
