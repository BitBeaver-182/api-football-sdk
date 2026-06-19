import { HttpClient, FootballDataClientOptions } from "./core/http";
import { AreasResource } from "./resources/areas";
import { CompetitionsResource } from "./resources/competitions";
import { MatchesResource } from "./resources/matches";
import { TeamsResource } from "./resources/teams";
import { PersonsResource } from "./resources/persons";
import { TrendsResource } from "./resources/trends";

export class FootballDataClient {
  readonly http: HttpClient;
  readonly areas: AreasResource;
  readonly competitions: CompetitionsResource;
  readonly matches: MatchesResource;
  readonly teams: TeamsResource;
  readonly persons: PersonsResource;
  readonly trends: TrendsResource;

  constructor(options: FootballDataClientOptions) {
    this.http = new HttpClient(options);
    this.areas = new AreasResource(this.http);
    this.competitions = new CompetitionsResource(this.http);
    this.matches = new MatchesResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.persons = new PersonsResource(this.http);
    this.trends = new TrendsResource(this.http);
  }

  raw<T>(endpoint: string, params?: Record<string, unknown>) {
    return this.http.get<T>(endpoint, params);
  }
}