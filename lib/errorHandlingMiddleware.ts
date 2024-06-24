import { NextApiRequest, NextApiResponse } from "next";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const errorHandlingMiddleware =
  (...handlers: Handler[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      for (const handler of handlers) {
        await handler(req, res);
      }
    } catch {
      res.status(500).json({ error: "unknown_error" });
    }
  };

export default errorHandlingMiddleware;
