import { PropsWithParams } from "@/lib/types";
import ProfileUrlForm from "@/components/ProfileUrlForm";
import Results from "@/components/Results";
import base64 from "base-64";

const Page = async (props: PropsWithParams) => {
  const { profileUrl } = props.params;
  const decoded = base64.decode(profileUrl);

  return (
    <>
      <ProfileUrlForm profileUrl={decoded} />
      <Results {...props} profileUrl={decoded} />
    </>
  );
};

export default Page;
