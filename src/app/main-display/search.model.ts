import { PriceData } from "./priceData.model";

export interface Search {
  id: number;
  description: string;
  ticker: string;
  low: number;
  high: number;
  data: PriceData;
}
