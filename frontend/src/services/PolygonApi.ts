import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface StockData {
    ticker: string;
    results: Array<{
      c: number;
    }>;
  }

// const API_KEY = "pbsFzS6jJgC2X0VjMOyZ_yjI6c922wAH";  - Old API Key
const API_KEY = "5lAECx83pQ7Wk2AQ1WT_QWWqUWxpEa_V";

export const polygonApi = createApi({
    reducerPath: 'polygon',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.polygon.io/v2',
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
        })
    })
});

export const {
    useGetStockCloseQuery,
    useGetMultipleStockClosesQuery
} = polygonApi;