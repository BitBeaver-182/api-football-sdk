import {
  ApiFootballClientOptions
} from "./types/common";
import {
  HttpClient
} from "./core/http";
import {
  ApiFootballError
} from "./core/errors";

export class ApiFootballClient {
  private _options: ApiFootballClientOptions;
  private _httpClient: HttpClient;

  constructor(options: ApiFootballClientOptions) {
    if (!options.apiKey) {
      throw new ApiFootballError("API Key is required.");
    }

    this._options = options;
    this._httpClient = new HttpClient(options);

    // Initialize resources here
    // Example:
    // this.countries = new CountriesResource(this._httpClient);
    // this.leagues = new LeaguesResource(this._httpClient);
    // ... and so on for all resources
  }

  // A generic method to perform a GET request using the underlying HttpClient
  // This can be used for direct endpoint access or by resource classes
  async get < T > (
    path: string,
    queryParams ? : Record < string, string | number | boolean | undefined > ,
    requestOptions ? : RequestInit
  ): Promise < T > {
    return this._httpClient.get < T > (path, queryParams, requestOptions);
  }

  // Placeholder for resource properties. These will be instantiated and assigned in the constructor
  // once the resource classes are defined.
  // public countries: CountriesResource;
  // public leagues: LeaguesResource;
  // public teams: TeamsResource;
  // ... etc
}