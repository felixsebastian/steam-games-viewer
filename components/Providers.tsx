"use client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Providers = (props: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{props.children}</TooltipProvider>
  </QueryClientProvider>
);

export default Providers;
