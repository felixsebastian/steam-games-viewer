import { PropsWithParams } from "@/lib/types";
import ProfileUrlForm from "@/components/ProfileUrlForm";
import Results from "@/components/Results";
import { decodeProfileUrl } from "@/lib/encoding";

const Page = async (props: PropsWithParams) => {
  const { profileUrl } = props.params;
  const decoded = decodeProfileUrl(profileUrl);

  return (
    <>
      <ProfileUrlForm profileUrl={decoded} />
      <Results {...props} profileUrl={decoded} />
    </>
  );
};

export default Page;
