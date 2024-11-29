import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfoliosApi = createApi({
    reducerPath: 'portfolios',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:5000/api/portfolios',
    }),
    endpoints: (builder) => ({
      getPortfolios: builder.query({
        query: () => '/',
      })
    })
  });

export const {
    useGetPortfoliosQuery,
} = portfoliosApi;