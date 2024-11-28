import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stocksApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://alpha-vantage.p.rapidapi.com/query',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '7fed9efa2fmshd58334dc47ec098p1f6e6ajsnc3a70bc9e35d');
            headers.set('x-rapidapi-host', 'alpha-vantage.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStock: builder.query({
            query: (symbol) => `?function=GLOBAL_QUOTE&symbol=${symbol}&datatype=json`,
        })
    })
});

export const {
    useGetStockQuery,
} = stocksApi;