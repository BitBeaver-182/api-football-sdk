import { TeamInfo } from "./teams";

export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface FixturePeriods {
  first: number | null;
  second: number | null;
}

export interface FixtureCore {
  id: number;
  referee: string | null;
  timezone: string;
  date: string; // ISO8601
  timestamp: number;
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
  status: FixtureStatus;
  periods: FixturePeriods;
}

export interface FixtureTeamsBlock {
  home: TeamInfo & { winner: boolean | null };
  away: TeamInfo & { winner: boolean | null };
}

export interface FixtureGoals {
  home: number | null;
  away: number | null;
}

export interface FixtureScore {
  halftime: FixtureGoals;
  fulltime: FixtureGoals;
  extratime: FixtureGoals;
  penalty: FixtureGoals;
}

export interface FixtureEvent {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: TeamInfo;
  player: {
    id: number | null;
    name: string | null;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: "Goal" | "Card" | "Subst" | "Var";
  detail: string;
  comments: string | null;
}

export interface FixtureLineupPlayer {
  id: number;
  name: string;
  number: number | null;
  pos: string | null;
  grid: string | null;
}

export interface FixtureLineup {
  team: TeamInfo & { colors: any };
  formation: string;
  startXI: { player: FixtureLineupPlayer }[];
  substitutes: { player: FixtureLineupPlayer }[];
  coach: {
    id: number;
    name: string;
    photo: string | null;
  };
}

export interface FixtureTeamStatistic {
  type: string;
  value: string | number | null;
}

export interface FixtureStatisticsBlock {
  team: TeamInfo;
  statistics: FixtureTeamStatistic[];
}

export interface FixturePlayerStatsBlock {
  player: {
    id: number;
    name: string;
    photo: string | null;
  };
  statistics: any[];
}

export interface FixturePlayersResponseItem {
  team: TeamInfo;
  players: FixturePlayerStatsBlock[];
}

export interface FixtureResponseItem {
  fixture: FixtureCore;
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: FixtureTeamsBlock;
  goals: FixtureGoals;
  score: FixtureScore;
  events?: FixtureEvent[];
  lineups?: FixtureLineup[];
  statistics?: FixtureStatisticsBlock[];
  players?: FixturePlayersResponseItem[];
}

export interface FixturesParams {
  id?: number;
  ids?: string;
  live?: string;
  date?: string; // YYYY-MM-DD
  league?: number;
  season?: number;
  team?: number;
  last?: number;
  next?: number;
  from?: string;
  to?: string;
  round?: string;
  status?: string;
  venue?: string;
  timezone?: string;
}

export interface FixturesRoundsParams {
  league: number;
  season: number;
  current?: boolean;
  timezone?: string;
}

export type FixturesRoundsResponse = string[];

export interface FixturesHeadToHeadParams {
  h2h: string; // "{team1}-{team2}"
  date?: string;
  league?: number;
  season?: number;
  from?: string;
  to?: string;
  last?: number;
  next?: number;
  status?: string;
  venue?: string;
  timezone?: string;
}

export interface FixturesStatisticsParams {
  fixture: number;
  team?: number;
  half?: "1st Half" | "2nd Half";
}

export interface FixturesEventsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: "Goal" | "Card" | "Subst" | "Var";
}

export interface FixturesLineupsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: "startXI" | "substitutes";
}

export interface FixturesPlayersParams {
  fixture?: number;
  team?: number;
}
