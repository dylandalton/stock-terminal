export interface StockData {
    ticker: string;
    results: Array<{
      c: number;
    }>;
}

export interface PolygonAPIResult {
    T: string;
    v: number;
    vw: number;
    o: number;
    c: number;
    h: number;
    l: number;
    t: number;
    n: number;
}
  
export interface PolygonAPIResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: PolygonAPIResult[];
    status: string;
    request_id: string;
    count: number;
}