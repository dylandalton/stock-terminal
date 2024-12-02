// import PolygonAPIResponse from "@/models/Polygon.model";

// export const mockPolygonAPI: PolygonAPIResponse = {
// 	"ticker": "AAPL",
// 	"queryCount": 1,
// 	"resultsCount": 1,
// 	"adjusted": true,
// 	"results": [
// 		{
// 			"T": "AAPL",
// 			"v": 2.5317735e+07,
// 			"vw": 236.5349,
// 			"o": 234.805,
// 			"c": 237.33,
// 			"h": 237.81,
// 			"l": 233.97,
// 			"t": 1732914000000,
// 			"n": 268866
// 		}
// 	],
// 	"status": "OK",
// 	"request_id": "670fe793e71a6eb95b9ca02aa70329fe",
// 	"count": 1
// };


import { StockData } from '@/models/Polygon.model';

export const mockMultipleStockClosesResponse: StockData[] = [
  {
    ticker: 'AAPL',
    results: [{ c: 195.50 }]
  },
  {
    ticker: 'MSFT',
    results: [{ c: 375.25 }]
  },
  {
    ticker: 'GOOGL',
    results: [{ c: 141.75 }]
  },
  {
    ticker: 'BN',
    results: [{ c: 61.51 }]
  },
  {
    ticker: 'HLT',
    results: [{ c: 250.54 }]
  },
  {
    ticker: 'CMG',
    results: [{ c: 60.54 }]
  },
  {
    ticker: 'NKE',
    results: [{ c: 100.55 }]
  },
  {
    ticker: 'SNAP',
    results: [{ c: 121.22 }]
  }
];