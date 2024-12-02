// Define the metadata structure
interface AlphaVantageMetadata {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  }
  
  // Define the structure for each day's data
  export interface DailyData {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }
  
  // Define the structure for the time series data
  interface TimeSeriesDaily {
    [date: string]: DailyData;
  }
  
  // Combine metadata and time series into the main response type
  export interface AlphaVantageDailyResponse {
    'Meta Data': AlphaVantageMetadata;
    'Time Series (Daily)': TimeSeriesDaily;
  }