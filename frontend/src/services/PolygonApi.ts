import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "pbsFzS6jJgC2X0VjMOyZ_yjI6c922wAH";

export const polygonApi = createApi({
    reducerPath: 'polygon',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.polygon.io/v2',
    }),
    endpoints: (builder) => ({
        getStockClose: builder.query({
            query: (symbol) => `/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${API_KEY}`,
        })
    })
});

export const {
    useGetStockCloseQuery,
} = polygonApi;