import { footballData } from "./client";
import { PersonResponse } from "./types";

export async function getPerson(
  personId: number,
) {
  return footballData.get<PersonResponse>(
    `/persons/${personId}`,
  );
}

export async function getPersonMatches(
  personId: number,
) {
  return footballData.get(
    `/persons/${personId}/matches`,
  );
}