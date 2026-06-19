import { Resource } from "./base";

import {
  Country,
  CountriesParams
} from "../types/countries";

export class CountriesResource extends Resource {
  get(
    params?: CountriesParams
  ) {
    return super._get<Country[]>(
      "/countries",
      params
    );
  }
}