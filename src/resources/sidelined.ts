import { Resource } from "./base";
import { SidelinedParams, SidelinedItem } from "../types/sidelined";

export class SidelinedResource extends Resource {
  get(params: SidelinedParams) {
    return this._get<SidelinedItem[]>("/sidelined", params);
  }
}
