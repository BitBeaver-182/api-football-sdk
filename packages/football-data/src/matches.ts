import {
  MatchesApiFilters,
  Match,
  MatchesResult,
} from "./types";

import { footballData } from "./client";

export async function getMatches(
  filters?: Partial<MatchesApiFilters>,
) {
  return footballData.get<MatchesResult>(
    "/matches",
    {
      query: filters,
      next: {
        revalidate: 60,
      },
    },
  );
}

export async function getLiveMatches() {
  return footballData.get<MatchesResult>(
    "/matches",
    {
      query: {
        status: "LIVE",
      },
      next: {
        revalidate: 15,
      },
    },
  );
}

export async function getMatch(matchId: number) {
  return footballData.get<Match>(`/matches/${matchId}`);
}

export async function getMatchHead2Head(matchId: number) {
  return footballData.get<{
    filters: Record<string, unknown>;
    resultSet: Record<string, unknown>;
    aggregates: Record<string, unknown>;
    matches: Match[];
  }>(`/matches/${matchId}/head2head`);
}