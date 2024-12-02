import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_ALPHAV_API_KEY || "BF2XCK1EUJPI72EZ";
const baseUrl = import.meta.env.VITE_ALPHAV_API_URL || 'https://www.alphavantage.co/query';

export const alphaVantageApi = createApi({
    reducerPath: 'alphaVantage',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set('User-Agent', 'request');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStockPastWeekHistory: builder.query({
            query: (symbol) => `?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`,
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