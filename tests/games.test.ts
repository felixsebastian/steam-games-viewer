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
  describe("invalid profileUrl", () => {
    test("returns a 4XX error", async () => {
      const req = {
        nextUrl: { search: "profileUrl=abc" },
      } as NextRequest;

      const response = await GET(req);
      expect(response.status).toBe(400);
    });
  });

  describe("valid profileUrl", () => {
    test("returns the data", async () => {
      const req = {
        nextUrl: {
          search:
            "profileUrl=https://steamcommunity.com/profiles/76561197960434622",
        },
      } as NextRequest;

      const response = await GET(req);
      expect(response.status).toBe(200);
    });
  });
});
