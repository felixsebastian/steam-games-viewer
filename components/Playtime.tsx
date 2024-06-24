import createPlaytimeSummary from "@/lib/createPlaytimeSummary";
import { Badge } from "./ui/badge";

interface Props {
  minutes: number;
}

const Playtime = (props: Props) => {
  const items = createPlaytimeSummary(props.minutes);
  if (!items.length) return <Badge>Never played</Badge>;
  return <Badge>{items.join(" ")} played</Badge>;
};

export default Playtime;
