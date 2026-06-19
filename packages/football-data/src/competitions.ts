import { footballData } from "./client";
import {
  Competition,
  CompetitionMatchesFilters,
  CompetitionCode,
  CompetitionsResult,
  CompetitionMatchesResult,
  CompetitionStandingsResult,
  ScorersResult,
  Team,
} from "./types";

export async function getCompetitions() {
  return footballData.get<CompetitionsResult>("/competitions");
}

export async function getCompetition(code: CompetitionCode | string) {
  return footballData.get<Competition>(`/competitions/${code}`);
}

export async function getCompetitionMatches(
  code: CompetitionCode | string,
  filters?: CompetitionMatchesFilters,
) {
  return footballData.get<CompetitionMatchesResult>(
    `/competitions/${code}/matches`,
    { query: filters },
  );
}

export async function getCompetitionStandings(code: CompetitionCode | string) {
  return footballData.get<CompetitionStandingsResult>(`/competitions/${code}/standings`);
}

export async function getCompetitionTeams(code: CompetitionCode | string) {
  return footballData.get<{ count: number; teams: Team[] }>(
    `/competitions/${code}/teams`,
  );
}

export async function getCompetitionScorers(code: CompetitionCode | string) {
  return footballData.get<ScorersResult>(`/competitions/${code}/scorers`);
}
