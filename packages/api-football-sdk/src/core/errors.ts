export interface ApiFootballErrorDetails {
  status?: number;
  body?: unknown;
  url?: string;
  cause?: unknown;
}

export class ApiFootballError extends Error {
  status?: number;
  body?: unknown;
  url?: string;

  constructor(
    message: string,
    details: ApiFootballErrorDetails = {}
  ) {
    super(message);

    this.name = "ApiFootballError";

    this.status = details.status;
    this.body = details.body;
    this.url = details.url;

    if (details.cause) {
      this.cause = details.cause;
    }
  }
}
