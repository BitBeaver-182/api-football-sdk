const BASE_URL = "https://api.football-data.org/v4";

export class FootballDataError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export interface RequestOptions {
  query?: any;
  next?: NextFetchRequestConfig;
}

export class FootballDataClient {
  constructor(private apiKey: string) { }

  private buildUrl(
    path: string,
    query?: Record<string, unknown>
  ) {
    const url = new URL(`${BASE_URL}${path}`);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  async get<T>(
    path: string,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await fetch(
      this.buildUrl(path, options?.query),
      {
        headers: {
          "X-Auth-Token": this.apiKey,
        },
        next: options?.next,
      } as RequestInit & { next?: NextFetchRequestConfig },
    );

    if (!response.ok) {
      throw new FootballDataError(
        await response.text(),
        response.status,
      );
    }

    return response.json();
  }
}

export const footballData = new FootballDataClient(
  process.env.FOOTBALL_DATA_API_KEY!,
);