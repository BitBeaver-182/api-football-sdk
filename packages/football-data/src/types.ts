export interface AreasResult {
  count: number;
  filters: Record<string, unknown>;
  areas: Area[];
}

export interface Area {
  id: number;
  name: string;
  countryCode: string;
  flag: null | string;
  parentAreaId?: number | null;
  parentArea?: ParentArea | null;
}


export interface CompetitionsResult {
  count: number;
  filters: CompetitionsFilters;
  competitions: Competition[];
}

export type CompetitionResult =
  Omit<
    Competition,
    "area" |
    "currentSeason" |
    "emblem" |
    "lastUpdated" |
    "seasons" |
    "numberOfAvailableSeasons" |
    "plan"
  > & {
    area: Area;
    currentSeason: Season;
    emblem: string;
    lastUpdated: string;
    seasons: Season[];
  };


export interface Competition {
  id: number;
  area?: Area;
  code: CompetitionCode;
  currentSeason?: Season;
  emblem?: string;
  lastUpdated?: string;
  name: string;
  numberOfAvailableSeasons?: number;
  plan?: Plan;
  type: CompetitionType;
  seasons?: Season[];
}


export interface CompetitionsFilters {
  client: string;
}

export interface Season {
  id: number;
  startDate: Date;
  endDate: Date;
  currentMatchday?: number;
  winner?: Winner;
  stages: string[];
}

export interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue?: string;
  lastUpdated: string;
}

export interface CompetitionStandingsResult {
  filters: StandingFilters;
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
}

export interface StandingFilters {
  season?: number;
  matchday?: number;
  date?: string; // format yyyy-MM-dd
}

export interface Standing {
  stage: MatchStage;
  type: string;
  group?: MatchGroup;
  table: TableEntry[];
}

export interface TableEntry {
  position: number;
  team: Team;
  playedGames: number;
  form?: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}


export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}


// ========================================

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: Date;
  status: MatchStatus;
  minute: number;
  injuryTime: number;
  attendance: number;
  venue: string;
  matchday: number;
  stage: MatchStage;
  group: MatchGroup | null;
  lastUpdated: Date;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  goals: Goal[];
  penalties: Penalty[];
  bookings: Booking[];
  substitutions: Substitution[];
  odds: Odds;
  referees: Coach[];
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: Coach;
  leagueRank: null;
  formation: string;
  lineup: Bench[];
  bench: Bench[];
  statistics: { [key: string]: number };
}

export interface Bench {
  id: number;
  name: string;
  position: null | string;
  shirtNumber: number;
}

export interface Booking {
  minute: number;
  team: Player;
  player: Player;
  card: string;
}

export interface Player {
  id: number | null;
  name: null | string;
}


export interface Goal {
  minute: number;
  injuryTime: null;
  type: string;
  team: Player;
  scorer: Player;
  assist: Player | null;
  score: FullTime;
}

export interface FullTime {
  home: number;
  away: number;
}

export interface Odds {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface Penalty {
  player: Player;
  team: Player;
  scored: boolean;
}

export interface Score {
  winner: "AWAY" | "HOME" | "DRAW" | null;
  duration: string;
  fullTime: FullTime;
  halfTime: FullTime;
}


export interface Substitution {
  minute: number;
  team: Player;
  playerOut: Player;
  playerIn: Player;
}


export interface MatchesApiFilters {
  dateFrom: string; // A date in format yyyy-MM-dd
  dateTo: string;   // A date in format yyyy-MM-dd
  season: number;   // An integer, like [\d]{4}
  status: MatchStatus; // Status enum
  venue: "HOME" | "AWAY"; // Enum [ HOME | AWAY ]
  limit: number;    // Integer [1-500], Limit the result set
}


// ──────────────────────────────────────────────────────────────────────────────

export interface TeamsResponse {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: Competition[];
  coach: Coach;
  marketValue: number;
  squad: Squad[];
  staff: Coach[];
  lastUpdated: Date;
}


export interface Coach {
  id: number;
  firstName?: string;
  lastName?: string;
  name: string;
  dateOfBirth?: Date;
  contract: Contract;
  nationality: null | string;
  type?: string;
}

export interface Contract {
  start: string;
  until: string; // e.g. "2022-06"
}


export interface Squad {
  id: number;
  firstName: string;
  lastName: null | string;
  name: string;
  position: Position;
  dateOfBirth: Date;
  nationality: string;
  shirtNumber: number;
  marketValue: number | null;
  contract: Contract;
}



// ──────────────────────────────────────────────────────────────────────────────

export interface PersonResponse {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationality: string;
  position: string;
  shirtNumber: number;
  lastUpdated: Date;
  currentTeam: CurrentTeam;
}

export interface CurrentTeam {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: Competition[];
  contract: Contract;
}



// ---------------------------------------


export interface CompetitionMatchesResult {
  filters: CompetitionMatchesFilters;
  resultSet: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  competition: Competition;
  matches: Match[];
}

export interface MatchesResult {
  filters: Record<string, unknown>;
  resultSet: {
    count: number;
    first?: string;
    last?: string;
    played?: number;
  };
  matches: Match[];
}

export interface MatchHead2HeadResult {
  filters: Record<string, unknown>;
  resultSet: Record<string, unknown>;
  aggregates: Record<string, unknown>;
  matches: Match[];
}


export interface ScorersResult {
  count: number;
  filters: Record<string, unknown>;
  competition: Competition;
  season: unknown;
  scorers: Scorer[];
}

export interface Scorer {
  player: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    position: string;
    shirtNumber: number | null;
    lastUpdated: string;
  };
  team: Team;
  goals: number;
  assists: number | null;
  penalties: number | null;
}


export interface CompetitionMatchesFilters {
  season?: number;
  matchday?: number;

  status?: MatchStatus;

  dateFrom?: string;
  dateTo?: string;

  stage?: MatchStage;
  group?: MatchGroup;
}





// ================== ENUMS ==================

export enum Plan {
  TierFour = "TIER_FOUR",
  TierOne = "TIER_ONE",
  TierThree = "TIER_THREE",
  TierTwo = "TIER_TWO",
}

export enum ParentArea {
  Africa = "Africa",
  Asia = "Asia",
  Europe = "Europe",
  NCAmerica = "N/C America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
  World = "World",
}

export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  TIMED = "TIMED",

  IN_PLAY = "IN_PLAY",
  PAUSED = "PAUSED",

  EXTRA_TIME = "EXTRA_TIME",
  PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT",

  FINISHED = "FINISHED",

  SUSPENDED = "SUSPENDED",
  POSTPONED = "POSTPONED",

  CANCELLED = "CANCELLED",

  AWARDED = "AWARDED",
}

export enum MatchStage {
  ALL = "ALL",
  APERTURA = "APERTURA",
  CHAMPIONSHIP_ROUND = "CHAMPIONSHIP_ROUND",
  CLAUSURA = "CLAUSURA",
  FINAL = "FINAL",
  GROUP_STAGE = "GROUP_STAGE",
  LAST_16 = "LAST_16",
  LAST_32 = "LAST_32",
  LAST_64 = "LAST_64",
  PLAYOFF_ROUND_1 = "PLAYOFF_ROUND_1",
  PLAYOFF_ROUND_2 = "PLAYOFF_ROUND_2",
  PLAYOFFS = "PLAYOFFS",
  PRELIMINARY_ROUND = "PRELIMINARY_ROUND",
  QUALIFICATION = "QUALIFICATION",
  QUALIFICATION_ROUND_1 = "QUALIFICATION_ROUND_1",
  QUALIFICATION_ROUND_2 = "QUALIFICATION_ROUND_2",
  QUALIFICATION_ROUND_3 = "QUALIFICATION_ROUND_3",
  QUARTER_FINALS = "QUARTER_FINALS",
  REGULAR_SEASON = "REGULAR_SEASON",
  RELEGATION_ROUND = "RELEGATION_ROUND",
  ROUND_1 = "ROUND_1",
  ROUND_2 = "ROUND_2",
  ROUND_3 = "ROUND_3",
  ROUND_4 = "ROUND_4",
  SEMI_FINALS = "SEMI_FINALS",
  THIRD_PLACE = "THIRD_PLACE",
}

export enum MatchGroup {
  GROUP_A = "GROUP_A",
  GROUP_B = "GROUP_B",
  GROUP_C = "GROUP_C",
  GROUP_D = "GROUP_D",
  GROUP_E = "GROUP_E",
  GROUP_F = "GROUP_F",
  GROUP_G = "GROUP_G",
  GROUP_H = "GROUP_H",
  GROUP_I = "GROUP_I",
  GROUP_J = "GROUP_J",
  GROUP_K = "GROUP_K",
  GROUP_L = "GROUP_L",
}

export enum Position {
  Defence = "Defence",
  Goalkeeper = "Goalkeeper",
  Midfield = "Midfield",
  Offence = "Offence",
}

export enum CompetitionType {
  LEAGUE = "LEAGUE",
  LEAGUE_CUP = "LEAGUE_CUP",
  CUP = "CUP",
  PLAYOFFS = "PLAYOFFS",
  SUPER_CUP = "SUPER_CUP",
}

export enum CompetitionCode {
  WC = "WC",
  CL = "CL",
  PL = "PL",
  BL1 = "BL1",
  PD = "PD",
  SA = "SA",
  FL1 = "FL1",
  ELC = "ELC",
  DED = "DED",
  PPL = "PPL",
  BSA = "BSA",
  MLS = "MLS",
}
