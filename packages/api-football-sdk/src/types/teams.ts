export interface TeamInfo {
  id: number;
  name: string;
  code: string | null;
  country: string | null;
  founded: number | null;
  national: boolean;
  logo: string | null;
}

export interface VenueInfo {
  id: number | null;
  name: string | null;
  address: string | null;
  city: string | null;
  capacity: number | null;
  surface: string | null;
  image: string | null;
}

export interface TeamResponseItem {
  team: TeamInfo;
  venue: VenueInfo;
}

export interface TeamsParams {
  id?: number;
  name?: string;
  league?: number;
  season?: number;
  country?: string;
  code?: string;
  venue?: number;
  search?: string;
}

export interface FixturesPlayedRecord {
  home: number;
  away: number;
  total: number;
}

export interface GoalsForAgainstAverage {
  home: string;
  away: string;
  total: string;
}

export interface GoalsForAgainstMinuteBucket {
  total: number | null;
  percentage: string | null;
}

export interface GoalsForAgainst {
  total: Record<string, number | null>;
  average: GoalsForAgainstAverage;
  minute: Record<string, GoalsForAgainstMinuteBucket>;
}

export interface TeamStatisticsResponse {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  team: TeamInfo;
  form: string;
  fixtures: {
    played: FixturesPlayedRecord;
    wins: FixturesPlayedRecord;
    draws: FixturesPlayedRecord;
    loses: FixturesPlayedRecord;
  };
  goals: {
    for: GoalsForAgainst;
    against: GoalsForAgainst;
  };
  biggest: any;
  clean_sheet: any;
  failed_to_score: any;
  penalty: any;
  lineups: any[];
  cards: any;
}

export interface TeamsStatisticsParams {
  league: number;
  season: number;
  team: number;
  date?: string; // YYYY-MM-DD
}

export type TeamsCountriesResponse = {
  name: string;
  code: string | null;
  flag: string | null;
}[];
