import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface StockData {
    ticker: string;
    results: Array<{
      c: number;
    }>;
  }

const API_KEY = import.meta.env.VITE_POLYGON_API_KEY || '';
const baseUrl = import.meta.env.VITE_POLYGON_API_URL || '';

export const polygonApi = createApi({
    reducerPath: 'polygon',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getStockClose: builder.query({
            query: (symbol) => `/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${API_KEY}`,
        }),
        getMultipleStockCloses: builder.query<StockData[], string[]>({
            queryFn: async (symbols, _queryApi, _extraOptions, fetchWithBQ) => {
                try {
                    const results: StockData[] = [];
                    
                    for (const symbol of symbols) {
                        const response = await fetchWithBQ(`/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${API_KEY}`);
                        
                        if (response.error) {
                            return {
                                error: response.error as FetchBaseQueryError
                            };
                        }
                        
                        results.push(response.data as StockData);
                    }

                    return { data: results };
                } catch (error) {
                    return {
                        error: error as FetchBaseQueryError
                    };
                }
            }
        }),
        getStockFinancials: builder.query({
            query: (symbol) => `/vX/reference/financials?ticker=${symbol}&timeframe=annual&limit=20&apiKey=${API_KEY}`,
        }),
        getStockNews: builder.query({
            query: (symbol) => `/v2/reference/news?ticker=${symbol}&order=desc&limit=10&apiKey=${API_KEY}`,
        })
    })
});

export const {
    useGetStockCloseQuery,
    useGetMultipleStockClosesQuery,
    useGetStockFinancialsQuery,
    useGetStockNewsQuery,
} = polygonApi;