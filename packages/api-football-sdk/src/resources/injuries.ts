import { Resource } from "./base";
import { InjuriesParams, InjuryItem } from "../types/injuries";

export class InjuriesResource extends Resource {
  get(params?: InjuriesParams) {
    return this._get<InjuryItem[]>("/injuries", params);
  }
}
