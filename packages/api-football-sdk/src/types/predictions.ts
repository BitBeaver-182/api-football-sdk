import { TeamInfo } from "./teams";

export interface PredictionWinner {
  id: number | null;
  name: string | null;
  comment: string | null;
}

export interface PredictionPercent {
  home: string;
  draw: string;
  away: string;
}

export interface PredictionsResponseItem {
  predictions: {
    winner: PredictionWinner;
    win_or_draw: boolean;
    under_over: string | null;
    goals: { home: string; away: string };
    advice: string;
    percent: PredictionPercent;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  teams: {
    home: TeamInfo & { last_5: any; league: any };
    away: TeamInfo & { last_5: any; league: any };
  };
  comparison: {
    home: any[];
    away: any[];
  };
  h2h: {
    home: any[];
    away: any[];
  };
}

export interface PredictionsParams {
  fixture: number;
}
