import { Resource } from "./base";
import {
  Competition,
  CompetitionMatchesFilters,
  CompetitionsResult,
  CompetitionMatchesResult,
  CompetitionStandingsResult,
  ScorersResult,
  StandingFilters,
  Team,
} from "../types";

export class CompetitionsResource extends Resource {
  list(filters?: { areas?: string | number[] }) {
    const query: Record<string, any> = {};
    if (filters?.areas) {
      query.areas = Array.isArray(filters.areas) ? filters.areas.join(",") : filters.areas;
    }
    return this._get<CompetitionsResult>("/competitions", query);
  }

  get(code: string | number) {
    return this._get<Competition>(`/competitions/${code}`);
  }

  standings(code: string | number, filters?: StandingFilters) {
    return this._get<CompetitionStandingsResult>(`/competitions/${code}/standings`, filters);
  }

  matches(code: string | number, filters?: CompetitionMatchesFilters) {
    return this._get<CompetitionMatchesResult>(`/competitions/${code}/matches`, filters);
  }

  teams(code: string | number, filters?: { season?: number }) {
    return this._get<{ count: number; teams: Team[] }>(`/competitions/${code}/teams`, filters);
  }

  scorers(code: string | number, filters?: { season?: number; limit?: number }) {
    return this._get<ScorersResult>(`/competitions/${code}/scorers`, filters);
  }
}
