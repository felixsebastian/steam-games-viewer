import { Duration, intervalToDuration } from "date-fns";

const createPlaytimeSummary = (minutes: number) => {
  const d = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000,
  });

  const order: (keyof Duration)[] = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
  ];

  const items = order.reduce<string[]>((result, next) => {
    const value = d[next];

    if (value !== undefined && value > 0) {
      result.push(`${d[next]} ${next}`);
    }

    return result;
  }, []);

  return items.slice(0, 3);
};

export default createPlaytimeSummary;
