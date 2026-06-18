import { Resource } from "./base";
import { CoachsParams, CoachItem } from "../types/coaches";

export class CoachesResource extends Resource {
  get(params?: CoachsParams) {
    return this._get<CoachItem[]>("/coachs", params);
  }
}
