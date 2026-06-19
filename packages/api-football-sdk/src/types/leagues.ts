export interface LeagueSeasonCoverageFixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

export interface LeagueSeasonCoverage {
  fixtures: LeagueSeasonCoverageFixtures;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface LeagueSeason {
  year: number;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  current: boolean;
  coverage: LeagueSeasonCoverage;
}

export interface LeagueInfo {
  id: number;
  name: string;
  type: "League" | "Cup";
  logo: string | null;
}

export interface LeagueCountry {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface LeagueResponseItem {
  league: LeagueInfo;
  country: LeagueCountry;
  seasons: LeagueSeason[];
}

export interface LeaguesParams {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  type?: "league" | "cup";
  current?: boolean;
  search?: string;
  last?: number;
}

export type LeagueSeasonsList = number[];
