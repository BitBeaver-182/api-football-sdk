import { Resource } from "./base";
import { StandingsParams, StandingsResponseItem } from "../types/standings";

export class StandingsResource extends Resource {
  get(params: StandingsParams) {
    return this._get<StandingsResponseItem[]>("/standings", params);
  }
}
