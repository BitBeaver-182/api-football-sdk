import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiFootballClient } from "../src/client";

describe("ApiFootballClient", () => {
  const apiKey = "test-api-key";
  let fetchMock: any;
  let client: ApiFootballClient;

  beforeEach(() => {
    fetchMock = vi.fn();
    client = new ApiFootballClient({ apiKey, fetchImpl: fetchMock });
  });

  const mockResponse = { get: "test", response: [] };

  const setupMock = () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      headers: new Headers(),
    });
  };

  it("should support raw requests", async () => {
    setupMock();
    const res = await client.raw("/custom-endpoint", { param: "value" });
    expect(res).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/custom-endpoint?param=value",
      expect.any(Object)
    );
  });

  it("should expose rateLimit", () => {
    expect(client.rateLimit).toBeDefined();
  });

  it("timezone list", async () => {
    setupMock();
    await client.timezone.list();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/timezone",
      expect.any(Object)
    );
  });

  it("countries get", async () => {
    setupMock();
    await client.countries.get({ search: "France" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/countries?search=France",
      expect.any(Object)
    );
  });

  it("leagues get and seasons", async () => {
    setupMock();
    await client.leagues.get({ id: 39 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/leagues?id=39",
      expect.any(Object)
    );

    setupMock();
    await client.leagues.seasons();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/leagues/seasons",
      expect.any(Object)
    );
  });

  it("teams get, statistics, seasons, countries", async () => {
    setupMock();
    await client.teams.get({ id: 33 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/teams?id=33",
      expect.any(Object)
    );

    setupMock();
    await client.teams.statistics({ team: 33, league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/teams/statistics?team=33&league=39&season=2020",
      expect.any(Object)
    );

    setupMock();
    await client.teams.seasons({ team: 33 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/teams/seasons?team=33",
      expect.any(Object)
    );

    setupMock();
    await client.teams.countries();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/teams/countries",
      expect.any(Object)
    );
  });

  it("venues get", async () => {
    setupMock();
    await client.venues.get({ id: 556 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/venues?id=556",
      expect.any(Object)
    );
  });

  it("standings get", async () => {
    setupMock();
    await client.standings.get({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/standings?league=39&season=2020",
      expect.any(Object)
    );
  });

  it("fixtures get, live, rounds, headToHead, statistics, events, lineups, players", async () => {
    setupMock();
    await client.fixtures.get({ id: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures?id=123",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.live();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures?live=all",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.live({ league: "39" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures?live=39",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.rounds({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/rounds?league=39&season=2020",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.headToHead({ h2h: "33-34" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/headtohead?h2h=33-34",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.statistics.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/statistics?fixture=123",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.events.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/events?fixture=123",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.lineups.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/lineups?fixture=123",
      expect.any(Object)
    );

    setupMock();
    await client.fixtures.players.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/fixtures/players?fixture=123",
      expect.any(Object)
    );
  });

  it("injuries get", async () => {
    setupMock();
    await client.injuries.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/injuries?fixture=123",
      expect.any(Object)
    );
  });

  it("predictions get", async () => {
    setupMock();
    await client.predictions.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/predictions?fixture=123",
      expect.any(Object)
    );
  });

  it("coaches get", async () => {
    setupMock();
    await client.coaches.get({ id: 80 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/coachs?id=80",
      expect.any(Object)
    );
  });

  it("players get, seasons, squads, topScorers, topAssists, topYellowCards, topRedCards", async () => {
    setupMock();
    await client.players.get({ id: 276 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players?id=276",
      expect.any(Object)
    );

    setupMock();
    await client.players.seasons({ player: 276 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/seasons?player=276",
      expect.any(Object)
    );

    setupMock();
    await client.players.squads.get({ team: 33 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/squads?team=33",
      expect.any(Object)
    );

    setupMock();
    await client.players.topScorers.get({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/topscorers?league=39&season=2020",
      expect.any(Object)
    );

    setupMock();
    await client.players.topAssists.get({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/topassists?league=39&season=2020",
      expect.any(Object)
    );

    setupMock();
    await client.players.topYellowCards.get({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/topyellowcards?league=39&season=2020",
      expect.any(Object)
    );

    setupMock();
    await client.players.topRedCards.get({ league: 39, season: 2020 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/topredcards?league=39&season=2020",
      expect.any(Object)
    );
  });

  it("transfers get", async () => {
    setupMock();
    await client.transfers.get({ player: 276 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/transfers?player=276",
      expect.any(Object)
    );
  });

  it("trophies get", async () => {
    setupMock();
    await client.trophies.get({ player: 276 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/trophies?player=276",
      expect.any(Object)
    );
  });

  it("sidelined get", async () => {
    setupMock();
    await client.sidelined.get({ player: 276 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/sidelined?player=276",
      expect.any(Object)
    );
  });

  it("odds get, live get, live bets get, mapping get, bookmakers get, bets get", async () => {
    setupMock();
    await client.odds.get({ fixture: 123 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds?fixture=123",
      expect.any(Object)
    );

    setupMock();
    await client.odds.live.get({ league: 39 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds/live?league=39",
      expect.any(Object)
    );

    setupMock();
    await client.odds.live.bets.get({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds/live/bets?id=1",
      expect.any(Object)
    );

    setupMock();
    await client.odds.mapping.get({ page: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds/mapping?page=1",
      expect.any(Object)
    );

    setupMock();
    await client.odds.bookmakers.get({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds/bookmakers?id=1",
      expect.any(Object)
    );

    setupMock();
    await client.odds.bets.get({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/odds/bets?id=1",
      expect.any(Object)
    );
  });

  it("status get", async () => {
    setupMock();
    await client.status.get();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/status",
      expect.any(Object)
    );
  });
});
