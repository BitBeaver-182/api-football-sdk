export interface TrophyItem {
  league: string;
  country: string;
  season: string;
  place: "Winner" | "Runner-Up";
}

export interface TrophiesParams {
  player?: number;
  coach?: number;
}
