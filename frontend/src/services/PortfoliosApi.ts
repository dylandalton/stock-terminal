import { Holding } from "@/models/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfoliosApi = createApi({
    reducerPath: 'portfolios',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:5000/api/portfolios',
    }),
    endpoints: (builder) => ({
      getPortfolios: builder.query({
        query: () => '/',
      }),
      createHolding: builder.mutation<any, { userId: string, holdingData: Holding }>({
        query: ({ userId, holdingData }) => ({
          url: `/${userId}/holdings`,
          method: 'POST',
          body: holdingData
        })
      })
    })
  });

export const {
    useGetPortfoliosQuery,
    useCreateHoldingMutation,
} = portfoliosApi;