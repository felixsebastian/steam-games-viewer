import { PropsWithParams } from "@/lib/types";
import SteamIdForm from "@/components/SteamIdForm";
import Results from "@/components/Results";

const Page = async (props: PropsWithParams) => {
  const { steamid } = props.params;

  return (
    <>
      <SteamIdForm steamid={steamid} />
      <Results {...props} />
    </>
  );
};

export default Page;
