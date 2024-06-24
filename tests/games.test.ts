/**
 * @jest-environment node
 */
import { GET } from "@/app/api/games/route";
import { NextRequest } from "next/server";
import mockSteamResponse from "./fixtures/mockSteamResponse";

jest.mock("../lib/SteamApiClient", () => {
  return {
    SteamApiClient: jest.fn().mockImplementation(() => {
      return { fetchGames: () => Promise.resolve(mockSteamResponse) };
    }),
  };
});

describe("/api/games", () => {
  describe("invalid steamid", () => {
    test("returns a 4XX error", async () => {
      const req = {
        nextUrl: { search: "steamid=abc" },
      } as NextRequest;

      const response = await GET(req);
      expect(response.status).toBe(400);
    });
  });

  describe("valid steamid", () => {
    test("returns the data", async () => {
      const req = {
        nextUrl: { search: "steamid=76561197960434622" },
      } as NextRequest;

      const response = await GET(req);
      expect(response.status).toBe(200);
    });
  });
});
