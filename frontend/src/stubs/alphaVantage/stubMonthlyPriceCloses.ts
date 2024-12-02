import { StockHistoryResponse } from '@/models/alphaVantage/AlphaVantage.model';

export const mockPastFiveYearsHistoryResponse: StockHistoryResponse = {
  "Meta Data": {
    "1. Information": "Monthly Adjusted Prices and Volumes",
    "2. Symbol": "IBM",
    "3. Last Refreshed": "2024-11-29",
    "4. Time Zone": "US/Eastern"
  },
  "Monthly Adjusted Time Series": {
    "2024-11-29": {
      "1. open": "207.7700",
      "2. high": "230.3600",
      "3. low": "204.0700",
      "4. close": "227.4100",
      "5. adjusted close": "227.4100",
      "6. volume": "77280587",
      "7. dividend amount": "1.6700"
    },
    "2024-10-31": {
      "1. open": "220.6300",
      "2. high": "237.3700",
      "3. low": "203.5100", 
      "4. close": "206.7200",
      "5. adjusted close": "205.0957",
      "6. volume": "105624376",
      "7. dividend amount": "0.0000"
    }
  }
};