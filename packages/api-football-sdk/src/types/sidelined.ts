export interface SidelinedItem {
  type: "injury" | "suspension";
  start: string;
  end: string | null;
}

export interface SidelinedParams {
  player?: number;
  coach?: number;
}
