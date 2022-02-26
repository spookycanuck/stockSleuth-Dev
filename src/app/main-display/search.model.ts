import { PriceData } from "./priceData.model";

export interface Search {
  id: number;
  description: string;
  ticker: string;
  low: number;
  high: number;
  data: PriceData;
}

// export const searches = [
//   {
//     id: 1,
//     description: 'Apple Inc.',
//     ticker: 'AAPL',
//     low: 236,
//     high: 252
//   },
//   {
//     id: 2,
//     description: 'Tesla Inc.',
//     ticker: 'TSLA',
//     low: 500,
//     high: 550
//   },
//   {
//     id: 3,
//     description: 'GameStop Corporation',
//     ticker: 'GME',
//     low: 150,
//     high: 169
//   },
//   {
//     id: 4,
//     description: 'Microsoft Corporation',
//     ticker: 'MSFT',
//     low: 290,
//     high: 320
//   },
// ];
