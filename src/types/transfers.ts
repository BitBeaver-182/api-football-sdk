import { TeamInfo } from "./teams";

export interface TransferDetail {
  date: string;
  type: string | null;
  teams: {
    in: TeamInfo;
    out: TeamInfo;
  };
}

export interface TransfersResponseItem {
  player: {
    id: number;
    name: string;
  };
  transfers: TransferDetail[];
}

export interface TransfersParams {
  player?: number;
  team?: number;
}
