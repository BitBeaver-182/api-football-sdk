import { describe, it, expect, vi, beforeEach } from "vitest";
import { FootballDataClient } from "../src/client";

describe("FootballDataClient", () => {
  const apiKey = "test-api-key";
  let fetchMock: any;
  let client: FootballDataClient;

  beforeEach(() => {
    fetchMock = vi.fn();
    client = new FootballDataClient({ apiKey, fetchImpl: fetchMock });
  });

  const mockResponse = { count: 1, areas: [] };

  const setupMock = () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
  };

  it("should support raw requests", async () => {
    setupMock();
    const res = await client.raw("/custom-endpoint", { param: "value" });
    expect(res).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/custom-endpoint?param=value",
      expect.any(Object)
    );
  });

  it("areas list and get", async () => {
    setupMock();
    await client.areas.list();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/areas",
      expect.any(Object)
    );

    setupMock();
    await client.areas.get(2077);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/areas/2077",
      expect.any(Object)
    );
  });

  it("competitions list, get, standings, matches, teams, scorers", async () => {
    setupMock();
    await client.competitions.list({ areas: [2016, 2023] });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions?areas=2016%2C2023",
      expect.any(Object)
    );

    setupMock();
    await client.competitions.get("PL");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions/PL",
      expect.any(Object)
    );

    setupMock();
    await client.competitions.standings("PL", { season: 2021 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions/PL/standings?season=2021",
      expect.any(Object)
    );

    setupMock();
    await client.competitions.matches("PL", { season: 2021, matchday: 37 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions/PL/matches?season=2021&matchday=37",
      expect.any(Object)
    );

    setupMock();
    await client.competitions.teams("PL", { season: 2021 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions/PL/teams?season=2021",
      expect.any(Object)
    );

    setupMock();
    await client.competitions.scorers("PL", { season: 2021, limit: 10 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/competitions/PL/scorers?season=2021&limit=10",
      expect.any(Object)
    );
  });

  it("matches list, live, get, head2head", async () => {
    setupMock();
    await client.matches.list({ status: "FINISHED" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/matches?status=FINISHED",
      expect.any(Object)
    );

    setupMock();
    await client.matches.live();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/matches?status=LIVE",
      expect.any(Object)
    );

    setupMock();
    await client.matches.get(330299);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/matches/330299",
      expect.any(Object)
    );

    setupMock();
    await client.matches.head2head(330299, { limit: 5 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/matches/330299/head2head?limit=5",
      expect.any(Object)
    );
  });

  it("teams get and matches", async () => {
    setupMock();
    await client.teams.get(86);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/teams/86",
      expect.any(Object)
    );

    setupMock();
    await client.teams.matches(86, { limit: 5 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/teams/86/matches?limit=5",
      expect.any(Object)
    );
  });

  it("persons get and matches", async () => {
    setupMock();
    await client.persons.get(44);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/persons/44",
      expect.any(Object)
    );

    setupMock();
    await client.persons.matches(44, { limit: 5 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/persons/44/matches?limit=5",
      expect.any(Object)
    );
  });

  it("trends get", async () => {
    setupMock();
    await client.trends.get({ window: 5, consider_side: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.football-data.org/v4/trends?window=5&consider_side=true",
      expect.any(Object)
    );
  });
});
