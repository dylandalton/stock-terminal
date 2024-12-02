import { StockHistoryResponse } from '@/models/alphaVantage/AlphaVantage.model';

export const mockPastYearHistoryResponse: StockHistoryResponse = {
  "Meta Data": {
    "1. Information": "Weekly Adjusted Prices and Volumes",
    "2. Symbol": "IBM",
    "3. Last Refreshed": "2024-11-29",
    "4. Time Zone": "US/Eastern"
  },
  "Weekly Adjusted Time Series": {
    "2024-11-29": {
      "1. open": "223.3500",
      "2. high": "230.3600",
      "3. low": "222.6500", 
      "4. close": "227.4100",
      "5. adjusted close": "227.4100",
      "6. volume": "17274177",
      "7. dividend amount": "0.0000"
    },
    "2024-11-22": {
      "1. open": "207.0000",
      "2. high": "227.2000",
      "3. low": "205.3701",
      "4. close": "222.9700",
      "5. adjusted close": "222.9700", 
      "6. volume": "21386866",
      "7. dividend amount": "0.0000"
    }
  }
};