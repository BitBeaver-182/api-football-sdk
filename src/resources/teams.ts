import { Resource } from "./base";
import {
  TeamsParams,
  TeamResponseItem,
  TeamsStatisticsParams,
  TeamStatisticsResponse,
  TeamsCountriesResponse,
} from "../types/teams";

export class TeamsResource extends Resource {
  get(params?: TeamsParams) {
    return this._get<TeamResponseItem[]>("/teams", params);
  }

  statistics(params: TeamsStatisticsParams) {
    return this._get<TeamStatisticsResponse>("/teams/statistics", params);
  }

  seasons(params: { team: number }) {
    return this._get<number[]>("/teams/seasons", params);
  }

  countries() {
    return this._get<TeamsCountriesResponse>("/teams/countries");
  }
}
