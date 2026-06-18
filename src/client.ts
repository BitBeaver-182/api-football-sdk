import { HttpClient } from "./core/http";
import { ApiFootballClientOptions } from "./types/common";

import { TimezoneResource } from "./resources/timezone";
import { CountriesResource } from "./resources/countries";
import { LeaguesResource } from "./resources/leagues";
import { TeamsResource } from "./resources/teams";
import { VenuesResource } from "./resources/venues";
import { StandingsResource } from "./resources/standings";
import { FixturesResource } from "./resources/fixtures";
import { InjuriesResource } from "./resources/injuries";
import { PredictionsResource } from "./resources/predictions";
import { CoachesResource } from "./resources/coaches";
import { PlayersResource } from "./resources/players";
import { TransfersResource } from "./resources/transfers";
import { TrophiesResource } from "./resources/trophies";
import { SidelinedResource } from "./resources/sidelined";
import { OddsResource } from "./resources/odds";
import { StatusResource } from "./resources/status";

export class ApiFootballClient {
  readonly http: HttpClient;
  readonly timezone: TimezoneResource;
  readonly countries: CountriesResource;
  readonly leagues: LeaguesResource;
  readonly teams: TeamsResource;
  readonly venues: VenuesResource;
  readonly standings: StandingsResource;
  readonly fixtures: FixturesResource;
  readonly injuries: InjuriesResource;
  readonly predictions: PredictionsResource;
  readonly coaches: CoachesResource;
  readonly players: PlayersResource;
  readonly transfers: TransfersResource;
  readonly trophies: TrophiesResource;
  readonly sidelined: SidelinedResource;
  readonly odds: OddsResource;
  readonly status: StatusResource;

  constructor(options: ApiFootballClientOptions) {
    this.http = new HttpClient(options);
    this.timezone = new TimezoneResource(this.http);
    this.countries = new CountriesResource(this.http);
    this.leagues = new LeaguesResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.venues = new VenuesResource(this.http);
    this.standings = new StandingsResource(this.http);
    this.fixtures = new FixturesResource(this.http);
    this.injuries = new InjuriesResource(this.http);
    this.predictions = new PredictionsResource(this.http);
    this.coaches = new CoachesResource(this.http);
    this.players = new PlayersResource(this.http);
    this.transfers = new TransfersResource(this.http);
    this.trophies = new TrophiesResource(this.http);
    this.sidelined = new SidelinedResource(this.http);
    this.odds = new OddsResource(this.http);
    this.status = new StatusResource(this.http);
  }

  get rateLimit() {
    return this.http.rateLimit;
  }

  raw<T>(endpoint: string, params?: Record<string, unknown>) {
    return this.http.get<T>(endpoint, params);
  }
}
