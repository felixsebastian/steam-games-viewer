"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ reset }: Props) => (
  <div>
    <h2>Something went wrong!</h2>
    <button onClick={() => reset()}>Try again</button>
  </div>
);

export default Error;
