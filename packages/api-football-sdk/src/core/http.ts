import {
  ApiFootballClientOptions,
  ApiFootballResponse,
  ApiFootballProvider
} from "../types/common";

import { ApiFootballError } from "./errors";
import { buildQueryString, sleep } from "./utils";

export interface RateLimitState {
  requestsRemaining?: number;
  requestsLimit?: number;
  dailyRemaining?: number;
}

const PROVIDER_DEFAULTS = {
  "api-sports": {
    host: "v3.football.api-sports.io",
  },
  rapidapi: {
    host: "api-football-v1.p.rapidapi.com",
  },
};

export class HttpClient {
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  private readonly baseUrl: string;
  private readonly authHeaders: Record<string, string>;

  readonly rateLimit: RateLimitState = {};

  constructor(options: ApiFootballClientOptions) {
    this.apiKey = options.apiKey;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
    this.timeout = options.timeout ?? 30000;
    this.maxRetries = options.maxRetries ?? 0;
    this.retryDelay = options.retryDelay ?? 500;

    const provider: ApiFootballProvider = options.provider ?? "api-sports";
    const host = options.host ?? PROVIDER_DEFAULTS[provider].host;
    this.baseUrl = options.baseUrl ?? `https://${host}`;

    if (provider === "api-sports") {
      this.authHeaders = {
        "x-apisports-key": this.apiKey,
      };
    } else {
      this.authHeaders = {
        "x-rapidapi-key": this.apiKey,
        "x-rapidapi-host": host,
      };
    }
  }

  async get<T>(
    path: string,
    params: Record<string, unknown> = {}
  ): Promise<ApiFootballResponse<T>> {
    return this.request<T>("GET", path, params);
  }

  async request<T>(
    method: string,
    path: string,
    params: Record<string, unknown> = {}
  ): Promise<ApiFootballResponse<T>> {
    const query = buildQueryString(params);

    const url =
      query.length > 0
        ? `${this.baseUrl.replace(/\/$/, "")}${path}?${query}`
        : `${this.baseUrl.replace(/\/$/, "")}${path}`;

    let lastError: unknown;

    for (
      let attempt = 0;
      attempt <= this.maxRetries;
      attempt++
    ) {
      try {
        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
          controller.abort();
        }, this.timeout);

        const response = await this.fetchImpl(url, {
          method,
          signal: controller.signal,
          headers: {
            ...this.authHeaders,
            "Accept": "application/json"
          }
        });

        clearTimeout(timeoutId);

        this.captureRateLimits(response);

        if (!response.ok) {
          throw new ApiFootballError(
            `HTTP ${response.status}`,
            {
              status: response.status,
              url
            }
          );
        }

        const body =
          (await response.json()) as ApiFootballResponse<T>;

        return body;
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries) {
          break;
        }

        await sleep(
          this.retryDelay * (attempt + 1)
        );
      }
    }

    if (lastError instanceof ApiFootballError) {
      throw lastError;
    }

    throw new ApiFootballError(
      "Request failed after retries",
      {
        url: path,
        cause: lastError
      }
    );
  }

  private captureRateLimits(
    response: Response
  ): void {
    const remaining =
      response.headers.get("x-ratelimit-requests-remaining");

    const limit =
      response.headers.get("x-ratelimit-requests-limit");

    const dailyRemaining =
      response.headers.get("x-ratelimit-day-remaining");

    if (remaining) {
      this.rateLimit.requestsRemaining = Number(remaining);
    }

    if (limit) {
      this.rateLimit.requestsLimit = Number(limit);
    }

    if (dailyRemaining) {
      this.rateLimit.dailyRemaining = Number(dailyRemaining);
    }
  }
}
