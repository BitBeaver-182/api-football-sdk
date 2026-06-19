import { footballData } from "./client";
import { Area, AreasResult } from "./types";

export async function getAreas() {
  return footballData.get<AreasResult>("/areas");
}

export async function getArea(id: number) {
  return footballData.get<Area>(`/areas/${id}`);
}
