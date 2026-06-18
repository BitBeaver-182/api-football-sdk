import { HttpClient } from "./core/http";

import { ApiFootballClientOptions } from "./types/common";

import { TimezoneResource } from "./resources/timezone";
import { CountriesResource } from "./resources/countries";
import { LeaguesResource } from "./resources/leagues";
import { TeamsResource } from "./resources/teams";
import { FixturesResource } from "./resources/fixtures";
import { StandingsResource } from "./resources/standings";
import { PlayersResource } from "./resources/players";
import { CoachesResource } from "./resources/coaches";
import { OddsResource } from "./resources/odds";

export class ApiFootballClient {
  readonly http: HttpClient;

  readonly timezone: TimezoneResource;

  readonly countries: CountriesResource;

  readonly leagues: LeaguesResource;

  readonly teams: TeamsResource;

  readonly fixtures: FixturesResource;

  readonly standings: StandingsResource;

  readonly players: PlayersResource;

  readonly coaches: CoachesResource;

  readonly odds: OddsResource;

  constructor(
    options: ApiFootballClientOptions
  ) {
    this.http = new HttpClient(options);

    this.timezone = new TimezoneResource(
      this.http
    );

    this.countries = new CountriesResource(
      this.http
    );

    this.leagues = new LeaguesResource(
      this.http
    );

    this.teams = new TeamsResource(
      this.http
    );

    this.fixtures = new FixturesResource(
      this.http
    );

    this.standings = new StandingsResource(
      this.http
    );

    this.players = new PlayersResource(
      this.http
    );

    this.coaches = new CoachesResource(
      this.http
    );

    this.odds = new OddsResource(
      this.http
    );
  }

  get rateLimit() {
    return this.http.rateLimit;
  }

  raw<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ) {
    return this.http.get<T>(
      endpoint,
      params
    );
  }
}