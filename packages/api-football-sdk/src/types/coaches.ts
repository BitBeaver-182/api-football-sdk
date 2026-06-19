import { TeamInfo } from "./teams";

export interface CoachCareerItem {
  team: TeamInfo;
  start: string | null;
  end: string | null;
}

export interface CoachItem {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: string | null;
  birth_date: string | null;
  birth_place: string | null;
  birth_country: string | null;
  nationality: string | null;
  height: string | null;
  weight: string | null;
  photo: string | null;
  career: CoachCareerItem[];
}

export interface CoachsParams {
  id?: number;
  team?: number;
  search?: string;
}
