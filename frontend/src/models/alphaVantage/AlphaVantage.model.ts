export interface DailyPriceData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}
  
export interface TimeSeriesDaily {
  [date: string]: DailyPriceData;
}

export interface StockPriceApiResponse {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': TimeSeriesDaily;
}

export interface PastWeekCloses {
  [date: string]: string;
}

// Past Year & Past 5 Years API Calls
interface AlphaVantageMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
}

interface StockPriceData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
}

export interface StockHistoryResponse {
  "Meta Data": AlphaVantageMetaData;
  "Monthly Adjusted Time Series"?: Record<string, StockPriceData>;
  "Weekly Adjusted Time Series"?: Record<string, StockPriceData>;
}