import { Resource } from "./base";
import { TrophiesParams, TrophyItem } from "../types/trophies";

export class TrophiesResource extends Resource {
  get(params: TrophiesParams) {
    return this._get<TrophyItem[]>("/trophies", params);
  }
}
