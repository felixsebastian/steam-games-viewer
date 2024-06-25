import { NextResponse } from "next/server";

export class InvalidSteamUrlError extends Error {}

export class ApiError extends Error {
  private _type: string;

  constructor(
    type = "unexpected_error",
    message = "Something unexpected went wrong",
  ) {
    super();
    this._type = type;
    this.message = message;
  }

  public get type() {
    return this._type;
  }
}

export class ServerError extends Error {
  private _status: number;
  private _code: string;

  constructor(
    status = 500,
    code = "unexpected_error",
    message = "Something went wrong",
  ) {
    super();
    this._status = status;
    this._code = code;
    this.message = message;
  }

  public getResponse() {
    return NextResponse.json(
      { code: this._code, message: this.message },
      { status: this._status },
    );
  }
}
