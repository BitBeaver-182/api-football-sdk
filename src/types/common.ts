export type ApiFootballProvider = "api-sports" | "rapidapi";

export interface ApiFootballClientOptions {
  apiKey: string;
  provider?: ApiFootballProvider;
  host?: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  fetchImpl?: typeof fetch;
}

export interface ApiFootballResponse<T> {
  get: string;
  parameters: Record<string, unknown>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
}
