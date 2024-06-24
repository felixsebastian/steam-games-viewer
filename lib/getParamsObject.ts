import { NextRequest } from "next/server";

const getParamsObject = (req: NextRequest) =>
  Object.fromEntries(new URLSearchParams(req.nextUrl.search));

export default getParamsObject;
