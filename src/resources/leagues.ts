import { Resource } from "./base";
import {
  LeaguesParams,
  LeagueResponseItem,
  LeagueSeasonsList,
} from "../types/leagues";

export class LeaguesResource extends Resource {
  get(params?: LeaguesParams) {
    return this._get<LeagueResponseItem[]>("/leagues", params);
  }

  seasons() {
    return this._get<LeagueSeasonsList>("/leagues/seasons");
  }
}
