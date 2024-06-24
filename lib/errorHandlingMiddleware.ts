import { NextRequest, NextResponse } from "next/server";

type Handler = (req: NextRequest) => Promise<NextResponse>;

const errorHandlingMiddleware =
  (handler: Handler) => async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (e: unknown) {
      console.error(e);
      return NextResponse.json({ error: "unexpected error" }, { status: 500 });
    }
  };

export default errorHandlingMiddleware;
