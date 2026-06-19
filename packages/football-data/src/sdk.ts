import { FootballDataClient } from "./client";
import {
  Area,
  AreasResult,
  CompetitionResult,
  CompetitionsResult,
  CompetitionStandingsResult,
  StandingFilters,
  CompetitionMatchesFilters,
  CompetitionMatchesResult,
  ScorersResult,
  Team,
  Match,
  MatchesApiFilters,
  MatchesResult,
  MatchHead2HeadResult,
  TeamsResponse,
  PersonResponse,
} from "./types";

export class FootballDataSdk {
  private client: FootballDataClient;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Api key required");
    }
    this.client = new FootballDataClient(apiKey);
  }

  // Fluent Sub-SDK Builders
  public competition(id?: string | number) {
    return new CompetitionSdk(this.client, id);
  }

  public match(id?: number) {
    return new MatchSdk(this.client, id);
  }

  public team(id?: number) {
    return new TeamSdk(this.client, id);
  }

  public person(id?: number) {
    return new PersonSdk(this.client, id);
  }

  public area(id?: number) {
    return new AreaSdk(this.client, id);
  }

  // Legacy/Top-level convenience methods for direct migration compatibility
  public async getAreas() {
    return this.area().getAll();
  }

  public async getArea(id: number) {
    return this.area(id).get();
  }

  public async getCompetitions() {
    return this.competition().getAll();
  }

  public async getCompetition(id: string | number) {
    return this.competition(id).get();
  }
}

export class CompetitionSdk {
  private urlPath: string;

  constructor(
    private client: FootballDataClient,
    private id?: string | number,
  ) {
    this.urlPath = id ? `/competitions/${id}` : "/competitions";
  }

  public async getAll() {
    return this.client.get<CompetitionsResult>("/competitions");
  }

  public async getById(id: string | number) {
    return this.client.get<CompetitionResult>(`/competitions/${id}`);
  }

  public async get() {
    if (!this.id) {
      throw new Error("Competition ID/Code required. Use sdk.competition(id).get()");
    }
    return this.client.get<CompetitionResult>(this.urlPath);
  }

  public async getStandings(filters?: StandingFilters) {
    if (!this.id) {
      throw new Error("Competition ID/Code required. Use sdk.competition(id).getStandings()");
    }
    return this.client.get<CompetitionStandingsResult>(`${this.urlPath}/standings`, { query: filters });
  }

  public async getMatches(filters?: CompetitionMatchesFilters) {
    if (!this.id) {
      throw new Error("Competition ID/Code required. Use sdk.competition(id).getMatches()");
    }
    return this.client.get<CompetitionMatchesResult>(`${this.urlPath}/matches`, { query: filters });
  }

  public async getTeams() {
    if (!this.id) {
      throw new Error("Competition ID/Code required. Use sdk.competition(id).getTeams()");
    }
    return this.client.get<{ count: number; teams: Team[] }>(`${this.urlPath}/teams`);
  }

  public async getScorers() {
    if (!this.id) {
      throw new Error("Competition ID/Code required. Use sdk.competition(id).getScorers()");
    }
    return this.client.get<ScorersResult>(`${this.urlPath}/scorers`);
  }
}

export class MatchSdk {
  constructor(
    private client: FootballDataClient,
    private id?: number,
  ) { }

  public async getAll(filters?: Partial<MatchesApiFilters>) {
    return this.client.get<MatchesResult>("/matches", {
      query: filters,
      next: { revalidate: 60 },
    });
  }

  public async getLive() {
    return this.client.get<MatchesResult>("/matches", {
      query: { status: "LIVE" },
      next: { revalidate: 15 },
    });
  }

  public async get(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Match ID required");
    }
    return this.client.get<Match>(`/matches/${targetId}`);
  }

  public async getHead2Head(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Match ID required");
    }
    return this.client.get<MatchHead2HeadResult>(`/matches/${targetId}/head2head`);
  }
}

export class TeamSdk {
  constructor(
    private client: FootballDataClient,
    private id?: number,
  ) { }

  public async get(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Team ID required");
    }
    return this.client.get<TeamsResponse>(`/teams/${targetId}`);
  }

  public async getMatches(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Team ID required");
    }
    return this.client.get<{ filters: Record<string, unknown>; matches: Match[] }>(`/teams/${targetId}/matches`);
  }
}

export class PersonSdk {
  constructor(
    private client: FootballDataClient,
    private id?: number,
  ) { }

  public async get(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Person ID required");
    }
    return this.client.get<PersonResponse>(`/persons/${targetId}`);
  }

  public async getMatches(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Person ID required");
    }
    return this.client.get<{ filters: Record<string, unknown>; matches: Match[] }>(`/persons/${targetId}/matches`);
  }
}

export class AreaSdk {
  constructor(
    private client: FootballDataClient,
    private id?: number,
  ) { }

  public async getAll() {
    return this.client.get<AreasResult>("/areas");
  }

  public async get(id?: number) {
    const targetId = id ?? this.id;
    if (!targetId) {
      throw new Error("Area ID required");
    }
    return this.client.get<Area>(`/areas/${targetId}`);
  }
}

export const sdk = new FootballDataSdk(process.env.FOOTBALL_DATA_API_KEY || "");
