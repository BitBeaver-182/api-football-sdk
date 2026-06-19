import { Resource } from "./base";
import { TeamsResponse } from "../types";

export class TeamsResource extends Resource {
  get(id: number) {
    return this._get<TeamsResponse>(`/teams/${id}`);
  }

  matches(id: number, filters?: {
    venue?: "HOME" | "AWAY";
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    stage?: string;
    limit?: number;
  }) {
    return this._get<any>(`/teams/${id}/matches`, filters);
  }
}
