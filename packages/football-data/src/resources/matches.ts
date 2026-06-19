import { Resource } from "./base";
import {
  MatchesApiFilters,
  Match,
  MatchesResult,
} from "../types";

export class MatchesResource extends Resource {
  list(filters?: Partial<MatchesApiFilters>) {
    return this._get<MatchesResult>("/matches", filters, {
      next: { revalidate: 60 },
    });
  }

  live() {
    return this._get<MatchesResult>(
      "/matches",
      { status: "LIVE" },
      { next: { revalidate: 15 } }
    );
  }

  get(id: number) {
    return this._get<Match>(`/matches/${id}`);
  }

  head2head(id: number, filters?: { limit?: number }) {
    return this._get<{
      filters: Record<string, unknown>;
      resultSet: Record<string, unknown>;
      aggregates: Record<string, unknown>;
      matches: Match[];
    }>(`/matches/${id}/head2head`, filters);
  }
}
