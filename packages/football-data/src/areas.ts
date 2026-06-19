import { footballData } from "./client";
import { Area } from "./types";

export interface AreasResult {
  count: number;
  filters: Record<string, unknown>;
  areas: Area[];
}

export async function getAreas() {
  return footballData.get<AreasResult>("/areas");
}

export async function getArea(id: number) {
  return footballData.get<Area>(`/areas/${id}`);
}
