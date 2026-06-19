export interface Country {
  name: string | null;

  code: string | null;

  flag: string | null;
}

export interface CountriesParams {
  name?: string;
  code?: string;
  search?: string;
}