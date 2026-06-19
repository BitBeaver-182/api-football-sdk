import { Resource } from "./base";
import { HttpClient } from "../core/http";
import {
  FixturesParams,
  FixtureResponseItem,
  FixturesRoundsParams,
  FixturesRoundsResponse,
  FixturesHeadToHeadParams,
  FixturesStatisticsParams,
  FixtureStatisticsBlock,
  FixturesEventsParams,
  FixtureEvent,
  FixturesLineupsParams,
  FixtureLineup,
  FixturesPlayersParams,
  FixturePlayersResponseItem,
} from "../types/fixtures";

export class FixturesResource extends Resource {
  readonly statistics: FixturesStatisticsResource;
  readonly events: FixturesEventsResource;
  readonly lineups: FixturesLineupsResource;
  readonly players: FixturesPlayersResource;

  constructor(http: HttpClient) {
    super(http);
    this.statistics = new FixturesStatisticsResource(http);
    this.events = new FixturesEventsResource(http);
    this.lineups = new FixturesLineupsResource(http);
    this.players = new FixturesPlayersResource(http);
  }

  get(params?: FixturesParams) {
    return this._get<FixtureResponseItem[]>("/fixtures", params);
  }

  live(params?: { league?: string }) {
    return this._get<FixtureResponseItem[]>("/fixtures", {
      live: params?.league || "all",
    });
  }

  rounds(params: FixturesRoundsParams) {
    return this._get<FixturesRoundsResponse>("/fixtures/rounds", params);
  }

  headToHead(params: FixturesHeadToHeadParams) {
    return this._get<FixtureResponseItem[]>("/fixtures/headtohead", params);
  }
}

export class FixturesStatisticsResource extends Resource {
  get(params: FixturesStatisticsParams) {
    return this._get<FixtureStatisticsBlock[]>("/fixtures/statistics", params);
  }
}

export class FixturesEventsResource extends Resource {
  get(params: FixturesEventsParams) {
    return this._get<FixtureEvent[]>("/fixtures/events", params);
  }
}

export class FixturesLineupsResource extends Resource {
  get(params: FixturesLineupsParams) {
    return this._get<FixtureLineup[]>("/fixtures/lineups", params);
  }
}

export class FixturesPlayersResource extends Resource {
  get(params: FixturesPlayersParams) {
    return this._get<FixturePlayersResponseItem[]>("/fixtures/players", params);
  }
}
