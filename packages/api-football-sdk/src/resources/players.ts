import { Resource } from "./base";
import { HttpClient } from "../core/http";
import {
  PlayersParams,
  PlayerResponseItem,
  PlayersSeasonsResponse,
  PlayersSquadsParams,
  PlayersSquadsResponseItem,
  TopPlayersParams,
} from "../types/players";

export class PlayersResource extends Resource {
  readonly squads: PlayersSquadsResource;
  readonly topScorers: TopPlayersResource;
  readonly topAssists: TopPlayersResource;
  readonly topYellowCards: TopPlayersResource;
  readonly topRedCards: TopPlayersResource;

  constructor(http: HttpClient) {
    super(http);
    this.squads = new PlayersSquadsResource(http);
    this.topScorers = new TopPlayersResource(http, "/players/topscorers");
    this.topAssists = new TopPlayersResource(http, "/players/topassists");
    this.topYellowCards = new TopPlayersResource(http, "/players/topyellowcards");
    this.topRedCards = new TopPlayersResource(http, "/players/topredcards");
  }

  get(params?: PlayersParams) {
    return this._get<PlayerResponseItem[]>("/players", params);
  }

  seasons(params?: { player?: number }) {
    return this._get<PlayersSeasonsResponse>("/players/seasons", params);
  }
}

export class PlayersSquadsResource extends Resource {
  get(params: PlayersSquadsParams) {
    return this._get<PlayersSquadsResponseItem[]>("/players/squads", params);
  }
}

export class TopPlayersResource extends Resource {
  constructor(http: HttpClient, private readonly path: string) {
    super(http);
  }

  get(params: TopPlayersParams) {
    return this._get<PlayerResponseItem[]>(this.path, params);
  }
}
