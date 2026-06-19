import { Resource } from "./base";
import { TransfersParams, TransfersResponseItem } from "../types/transfers";

export class TransfersResource extends Resource {
  get(params: TransfersParams) {
    return this._get<TransfersResponseItem[]>("/transfers", params);
  }
}
