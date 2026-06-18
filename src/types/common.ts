export interface ApiFootballPaging {
  current: number;
  total: number;
}

export interface ApiFootballResponse<T> {
  get: string | string[];

  parameters: Record<string, string>;

  errors: string[] | Record<string, string>;

  results: number;

  paging: ApiFootballPaging;

  response: T;
}

export interface RequestOptions {
  signal?: AbortSignal;
}

export interface ApiFootballClientOptions {
  apiKey: string;

  provider?: "api-sports" | "rapidapi";

  host?: string;

  baseUrl?: string;

  timeout?: number;

  maxRetries?: number;

  retryDelay?: number;

  extraHeaders?: Record<string, string>;

  fetchImpl?: typeof fetch;

  throwOnApiError?: boolean;
}
