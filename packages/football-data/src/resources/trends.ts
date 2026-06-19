import { Resource } from "./base";

export interface TrendsFilters {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  competitions?: string | string[];
  window?: number;
  consider_side?: boolean;
}

export class TrendsResource extends Resource {
  get(filters?: TrendsFilters) {
    const query: Record<string, any> = {};
    if (filters) {
      if (filters.date) query.date = filters.date;
      if (filters.dateFrom) query.dateFrom = filters.dateFrom;
      if (filters.dateTo) query.dateTo = filters.dateTo;
      if (filters.competitions) {
        query.competitions = Array.isArray(filters.competitions)
          ? filters.competitions.join(",")
          : filters.competitions;
      }
      if (filters.window) query.window = filters.window;
      if (filters.consider_side !== undefined) {
        // According to documentation, consider_side is a feature flag.
        // It can be passed as a boolean query param or string.
        query.consider_side = String(filters.consider_side);
      }
    }
    return this._get<any>("/trends", query);
  }
}
