import { Resource } from "./base";
import { PredictionsParams, PredictionsResponseItem } from "../types/predictions";

export class PredictionsResource extends Resource {
  get(params: PredictionsParams) {
    return this._get<PredictionsResponseItem[]>("/predictions", params);
  }
}
