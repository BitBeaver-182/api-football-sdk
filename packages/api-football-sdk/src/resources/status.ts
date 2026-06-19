import { Resource } from "./base";

export class StatusResource extends Resource {
  get() {
    return this._get<any>("/status");
  }
}
