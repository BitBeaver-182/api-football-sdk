export const PROVIDER_DEFAULTS = {
  "api-sports": {
    host: "v3.football.api-sports.io"
  },

  rapidapi: {
    host: "api-football-v1.p.rapidapi.com"
  }
} as const;

export type Provider = keyof typeof PROVIDER_DEFAULTS;
