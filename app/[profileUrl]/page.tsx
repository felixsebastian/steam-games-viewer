import { PropsWithParams } from "@/lib/types";
import ProfileUrlForm from "@/components/ProfileUrlForm";
import Results from "@/components/Results";

const Page = async (props: PropsWithParams) => {
  const { profileUrl } = props.params;

  return (
    <>
      <ProfileUrlForm profileUrl={decodeURIComponent(profileUrl)} />
      <Results {...props} profileUrl={decodeURIComponent(profileUrl)} />
    </>
  );
};

export default Page;
