"use client";
import { PropsWithParams } from "@/lib/types";
import SteamIdForm from "@/components/SteamIdForm";
import Results from "@/components/Results";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchGames from "@/lib/fetchGames";
import { pageSize } from "@/lib/constants";
import Pagination from "@/components/Pagination";

const Page = (props: PropsWithParams) => {
  const [page, setPage] = useState(1);
  const { steamid } = props.params;

  const { data } = useQuery({
    queryKey: ["games", steamid, page],
    queryFn: fetchGames(steamid, pageSize, (page - 1) * pageSize),
  });

  return (
    <>
      <SteamIdForm steamid={steamid} />
      {data && (
        <>
          <Results data={data} />
          <Pagination
            page={page}
            onPageChange={setPage}
            numberOfPages={data ? data.game_count / pageSize : 0}
          />
        </>
      )}
    </>
  );
};

export default Page;
