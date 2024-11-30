import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "BF2XCK1EUJPI72EZ";

export const alphaVantageApi = createApi({
    reducerPath: 'alphaVantage',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.alphavantage.co/query',
        prepareHeaders: (headers) => {
            headers.set('User-Agent', 'request');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStockHistory: builder.query({
            query: (symbol) => `?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`,
        })
    })
});

export const {
    useGetStockHistoryQuery,
} = alphaVantageApi;