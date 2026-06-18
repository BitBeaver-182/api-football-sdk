import { TeamInfo } from "./teams";

export interface StandingStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
}

export interface StandingRow {
  rank: number;
  team: TeamInfo;
  points: number;
  goalsDiff: number;
  group: string | null;
  form: string | null;
  status: string | null;
  description: string | null;
  all: StandingStats;
  home: StandingStats;
  away: StandingStats;
  update: string;
}

export interface StandingsResponseItem {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
    standings: StandingRow[][];
  };
}

export interface StandingsParams {
  league: number;
  season: number;
  team?: number;
}
