import { HttpClient } from "../core/http";

export abstract class Resource {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected _get<Response, Params extends Record<string, any> = any>(
    path: string,
    params?: Params
  ) {
    return this.http.get<Response>(
      path,
      params
    );
  }
}