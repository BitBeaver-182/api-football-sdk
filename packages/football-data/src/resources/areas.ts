import { Resource } from "./base";
import { Area, AreasResult } from "../types";

export class AreasResource extends Resource {
  list() {
    return this._get<AreasResult>("/areas");
  }

  get(id: number) {
    return this._get<Area>(`/areas/${id}`);
  }
}
