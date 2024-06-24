/**
 * @jest-environment node
 */
import { GET } from "@/app/api/games/route";
import { NextRequest } from "next/server";
import mockSteamResponse from "./fixtures/mockSteamResponse";
import "../lib/SteamApiClient";

jest.mock("../lib/SteamApiClient", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        fetchGames: () => Promise.resolve(mockSteamResponse),
      };
    }),
  };
});

describe("/api/games", () => {
  describe("invalid steamid", () => {
    test("returns a 4XX error", () => {
      const req = {
        nextUrl: { search: "steamid=abc" },
      } as NextRequest;

      (async () => {
        const response = await GET(req);
        expect(response.status).toBe(400);
      })();
    });
  });

  describe("valid steamid", () => {
    test("returns the data", () => {
      const req = {
        nextUrl: { search: "steamid=76561197960434622" },
      } as NextRequest;

      (async () => {
        const response = await GET(req);
        expect(response.status).toBe(200);
      })();
    });
  });
});
