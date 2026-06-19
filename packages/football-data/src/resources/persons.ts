import { Resource } from "./base";
import { PersonResponse } from "../types";

export class PersonsResource extends Resource {
  get(id: number) {
    return this._get<PersonResponse>(`/persons/${id}`);
  }

  matches(id: number, filters?: {
    lineup?: string;
    limit?: number;
  }) {
    return this._get<any>(`/persons/${id}/matches`, filters);
  }
}
