import { footballData } from "./client";
import { TeamsResponse } from "./types";

export async function getTeam(teamId: number) {
  return footballData.get<TeamsResponse>(
    `/teams/${teamId}`,
  );
}

export async function getTeamMatches(
  teamId: number,
) {
  return footballData.get(
    `/teams/${teamId}/matches`,
  );
}