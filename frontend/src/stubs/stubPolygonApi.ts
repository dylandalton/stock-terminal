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

export const mockStockFinancialsResponse = {
  "results": [
    {
      "start_date": "2023-07-01",
      "end_date": "2024-06-30",
      "filing_date": "2024-07-30",
      "acceptance_datetime": "2024-07-30T20:06:22Z",
      "timeframe": "annual",
      "fiscal_period": "FY",
      "fiscal_year": "2024",
      "cik": "0000789019",
      "sic": "7372",
      "tickers": [
        "MSFT"
      ],
      "company_name": "MICROSOFT CORP",
      "source_filing_url": "https://api.polygon.io/v1/reference/sec/filings/0000950170-24-087843",
      "source_filing_file_url": "http://api.polygon.io/v1/reference/sec/filings/0000950170-24-087843/files/msft-20240630_htm.xml",
      "financials": {
        "income_statement": {
          "basic_average_shares": {
            "value": 7431000000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "operating_income_loss": {
            "value": 109433000000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "operating_expenses": {
            "value": 61575000000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "research_and_development": {
            "value": 29510000000,
            "unit": "USD",
            "label": "Research and Development",
            "order": 1030
          },
          "net_income_loss": {
            "value": 88136000000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "basic_earnings_per_share": {
            "value": 11.86,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "diluted_average_shares": {
            "value": 7469000000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "revenues": {
            "value": 245122000000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "gross_profit": {
            "value": 171008000000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
        },
        "cash_flow_statement": {
          "net_cash_flow": {
            "value": -16179000000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "other_comprehensive_income_loss_attributable_to_parent": {
            "value": 753000000,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss Attributable To Parent",
            "order": 600
          },
          "comprehensive_income_loss": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "other_comprehensive_income_loss": {
            "value": 88889000000,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          }
        },
        "balance_sheet": {
          "liabilities": {
            "value": 243686000000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_assets": {
            "value": 352429000000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "long_term_debt": {
            "value": 44937000000,
            "unit": "USD",
            "label": "Long-term Debt",
            "order": 810
          },
          "equity": {
            "value": 268477000000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "current_assets": {
            "value": 159734000000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "noncurrent_liabilities": {
            "value": 118400000000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "cash": {
            "value": 75543000000,
            "unit": "USD",
            "label": "Cash",
            "order": 210
          },
          "current_liabilities": {
            "value": 125286000000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "assets": {
            "value": 512163000000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          }
        }
      }
    },
  ]
}