import { FixtureTeamsBlock } from "./fixtures";

export interface OddsValue {
  value: string;
  odd: string;
}

export interface OddsBet {
  id: number;
  name: string;
  values: OddsValue[];
}

export interface OddsBookmaker {
  id: number;
  name: string;
  bets: OddsBet[];
}

export interface OddsResponseItem {
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  update: boolean;
  bookmakers: OddsBookmaker[];
}

export interface OddsParams {
  fixture?: number;
  league?: number;
  season?: number;
  date?: string;
  page?: number;
  bookmaker?: number;
  bet?: number;
  timezone?: string;
}

export interface OddsLiveValue {
  value: string;
  odd: string;
  handicap?: "up" | "down";
  main?: boolean;
  suspended: boolean;
}

export interface OddsLiveBet {
  id: number;
  name: string;
  values: OddsLiveValue[];
}

export interface OddsLiveResponseItem {
  fixture: {
    id: number;
    status: any;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  teams: FixtureTeamsBlock;
  status?: {
    status: any;
    minute: number;
  };
  odds: {
    id: number;
    name: string;
    values: OddsLiveValue[];
  }[];
}

export interface OddsLiveParams {
  fixture?: number;
  league?: number;
  bet?: number;
}

export type OddsLiveBetsResponse = { id: number; name: string }[];

export interface OddsMappingItem {
  fixture: number;
  league: number;
  season: number;
  date: string;
}

export interface OddsMappingParams {
  page?: number;
}

export interface OddsBookmakersParams {
  id?: number;
  search?: string;
}

export type OddsBookmakersResponse = { id: number; name: string }[];

export interface OddsBetsParams {
  id?: number;
  search?: string;
}

export type OddsBetsResponse = { id: number; name: string }[];
