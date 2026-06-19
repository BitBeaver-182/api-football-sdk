import { buildQueryString } from "./utils";

export class FootballDataError extends Error {
  constructor(
    message: string,
    public status: number,
    public url?: string
  ) {
    super(message);
  }
}

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export interface FootballDataClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeout?: number;
}

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeout: number;

  constructor(options: FootballDataClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "https://api.football-data.org/v4";
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
    this.timeout = options.timeout ?? 30000;
  }

  async get<T>(
    path: string,
    params: Record<string, unknown> = {},
    options?: { next?: NextFetchRequestConfig }
  ): Promise<T> {
    return this.request<T>("GET", path, params, options);
  }

  async request<T>(
    method: string,
    path: string,
    params: Record<string, unknown> = {},
    options?: { next?: NextFetchRequestConfig }
  ): Promise<T> {
    const query = buildQueryString(params);
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url =
      query.length > 0
        ? `${this.baseUrl}${cleanPath}?${query}`
        : `${this.baseUrl}${cleanPath}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.timeout);

    try {
      const response = await this.fetchImpl(url, {
        method,
        signal: controller.signal,
        headers: {
          "X-Auth-Token": this.apiKey,
          "Accept": "application/json",
        },
        next: options?.next,
      } as RequestInit & { next?: NextFetchRequestConfig });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new FootballDataError(
          `HTTP ${response.status}: ${await response.text()}`,
          response.status,
          url
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof FootballDataError) {
        throw error;
      }
      throw new FootballDataError(
        error instanceof Error ? error.message : "Request failed",
        500,
        url
      );
    }
  }
}
