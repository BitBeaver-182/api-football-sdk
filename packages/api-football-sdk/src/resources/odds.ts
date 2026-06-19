import { Resource } from "./base";
import { HttpClient } from "../core/http";
import {
  OddsParams,
  OddsResponseItem,
  OddsLiveParams,
  OddsLiveResponseItem,
  OddsLiveBetsResponse,
  OddsMappingParams,
  OddsMappingItem,
  OddsBookmakersParams,
  OddsBookmakersResponse,
  OddsBetsParams,
  OddsBetsResponse,
} from "../types/odds";

export class OddsResource extends Resource {
  readonly live: OddsLiveResource;
  readonly mapping: OddsMappingResource;
  readonly bookmakers: OddsBookmakersResource;
  readonly bets: OddsBetsResource;

  constructor(http: HttpClient) {
    super(http);
    this.live = new OddsLiveResource(http);
    this.mapping = new OddsMappingResource(http);
    this.bookmakers = new OddsBookmakersResource(http);
    this.bets = new OddsBetsResource(http);
  }

  get(params?: OddsParams) {
    return this._get<OddsResponseItem[]>("/odds", params);
  }
}

export class OddsLiveResource extends Resource {
  readonly bets: OddsLiveBetsResource;

  constructor(http: HttpClient) {
    super(http);
    this.bets = new OddsLiveBetsResource(http);
  }

  get(params?: OddsLiveParams) {
    return this._get<OddsLiveResponseItem[]>("/odds/live", params);
  }
}

export class OddsLiveBetsResource extends Resource {
  get(params?: { id?: number; search?: string }) {
    return this._get<OddsLiveBetsResponse>("/odds/live/bets", params);
  }
}

export class OddsMappingResource extends Resource {
  get(params?: OddsMappingParams) {
    return this._get<OddsMappingItem[]>("/odds/mapping", params);
  }
}

export class OddsBookmakersResource extends Resource {
  get(params?: OddsBookmakersParams) {
    return this._get<OddsBookmakersResponse>("/odds/bookmakers", params);
  }
}

export class OddsBetsResource extends Resource {
  get(params?: OddsBetsParams) {
    return this._get<OddsBetsResponse>("/odds/bets", params);
  }
}
