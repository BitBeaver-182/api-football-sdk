import { Resource } from "./base";
import { TimezoneList } from "../types/timezone";

export class TimezoneResource extends Resource {
  list() {
    return this._get<TimezoneList>("/timezone");
  }
}
