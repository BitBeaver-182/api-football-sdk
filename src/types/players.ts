import { TeamInfo } from "./teams";

export interface PlayerBirth {
  date: string | null;
  place: string | null;
  country: string | null;
}

export interface PlayerInfo {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number | null;
  birth: PlayerBirth;
  nationality: string | null;
  height: string | null;
  weight: string | null;
  injured: boolean;
  photo: string | null;
}

export interface PlayerSeasonStatistics {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  team: TeamInfo;
  games: any;
  substitutes: any;
  shots: any;
  goals: any;
  passes: any;
  tackles: any;
  duels: any;
  dribbles: any;
  fouls: any;
  cards: any;
  penalty: any;
}

export interface PlayerResponseItem {
  player: PlayerInfo;
  statistics: PlayerSeasonStatistics[];
}

export interface PlayersParams {
  id?: number;
  team?: number;
  league?: number;
  season?: number;
  search?: string;
  page?: number;
}

export type PlayersSeasonsResponse = number[];

export interface PlayersSquadsParams {
  team?: number;
  player?: number;
}

export interface SquadPlayer {
  id: number;
  name: string;
  age: number | null;
  number: number | null;
  position: string | null;
  photo: string | null;
}

export interface PlayersSquadsResponseItem {
  team: TeamInfo;
  players: SquadPlayer[];
}

export interface TopPlayersParams {
  league: number;
  season: number;
}
