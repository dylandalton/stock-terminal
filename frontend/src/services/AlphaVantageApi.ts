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
        getStockPastWeekHistory: builder.query({
            query: (symbol) => `?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`,
        }),
        getStockPastYearHistory: builder.query({
            query: (symbol) => `?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`,
        }),
        getStockPastFiveYearsHistory: builder.query({
            query: (symbol) => `?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`,
        })
    })
});

export const {
    useGetStockPastWeekHistoryQuery,
    useGetStockPastYearHistoryQuery,
    useGetStockPastFiveYearsHistoryQuery,
} = alphaVantageApi;