import { Duration, intervalToDuration } from "date-fns";

const createPlaytimeSummary = (minutes: number, short = false) => {
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
      result.push(
        `${d[next]}${short ? "" : " "}${short ? next.slice(0, 1) : next}`,
      );
    }

    return result;
  }, []);

  return items.slice(0, 3);
};

export default createPlaytimeSummary;
