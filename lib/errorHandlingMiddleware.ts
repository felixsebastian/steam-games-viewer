import { NextRequest, NextResponse } from "next/server";
import { ServerError } from "./errors";

type Handler = (req: NextRequest) => Promise<NextResponse>;

const errorHandlingMiddleware =
  (handler: Handler) => async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof ServerError) return e.getResponse();
      return new ServerError().getResponse();
    }
  };

export default errorHandlingMiddleware;
