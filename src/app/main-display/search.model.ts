import { PriceData } from "./priceData.model";
import { OverviewData } from "./overviewData.model";

export interface Search {
  id: number;
  description: string;
  ticker: string;
  low: number;
  high: number;
  data: PriceData;
  overview: OverviewData;
}
