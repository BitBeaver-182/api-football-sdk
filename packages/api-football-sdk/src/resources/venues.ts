import { Resource } from "./base";
import { Venue, VenuesParams } from "../types/venues";

export class VenuesResource extends Resource {
  get(params?: VenuesParams) {
    return this._get<Venue[]>("/venues", params);
  }
}
