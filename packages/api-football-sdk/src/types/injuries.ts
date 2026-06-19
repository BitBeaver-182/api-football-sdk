import { TeamInfo } from "./teams";
import { FixtureCore } from "./fixtures";

export interface InjuryItem {
  player: {
    id: number;
    name: string;
    photo: string | null;
    type: string;
    reason: string;
  };
  team: TeamInfo;
  fixture: FixtureCore;
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
}

export interface InjuriesParams {
  league?: number;
  season?: number;
  fixture?: number;
  team?: number;
  player?: number;
  date?: string;
  timezone?: string;
}
