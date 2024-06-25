import { useQuery } from "@tanstack/react-query";
import fetchGames from "./fetchGames";

const useResults = (profileUrl: string) => {
  return useQuery({
    queryFn: fetchGames(profileUrl),
    queryKey: ["games", profileUrl],
    enabled: profileUrl.length > 0,
    retry: false,
  });
};

export default useResults;
