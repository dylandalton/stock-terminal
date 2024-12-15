import { Holding } from "@/models/User";
import { ArticlesScrapedResponse } from "@/state/slices/scrapedArticlesSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_PORTFOLIOS_API_URL || '';

export const portfoliosApi = createApi({
    reducerPath: 'portfolios',
    baseQuery: fetchBaseQuery({
      baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
      getPortfolios: builder.query({
        query: () => '/',
      }),
      getTest: builder.query({
        query: ({symbol}) =>({
          url: `/${symbol}`,
          method: 'GET'
        })
      }),
      createHolding: builder.mutation<any, { userId: string, holdingData: Holding }>({
        query: ({ userId, holdingData }) => ({
          url: `/${userId}/holdings`,
          method: 'POST',
          body: holdingData
        })
      }),
      deleteHolding: builder.mutation<any, {userId: string, symbol: string}>({
        query: ({ userId, symbol }) => ({
          url: `/${userId}/holdings/${symbol}`,
          method: 'DELETE'
        })
      }),
      updateHolding: builder.mutation<any, {userId: string, holdingId: string, holdingData: Holding}>({
        query: ({userId, holdingId, holdingData}) => ({
          url: `/${userId}/holdings/${holdingId}`,
          method: 'PUT',
          body: holdingData
        })
      }),
      getScrapedArticles: builder.query<ArticlesScrapedResponse[], string>({
        query: (symbol) => `/scrapedArticles/${symbol}`
      })
    })
  });

export const {
    useGetPortfoliosQuery,
    useCreateHoldingMutation,
    useDeleteHoldingMutation,
    useUpdateHoldingMutation,
    useGetScrapedArticlesQuery
} = portfoliosApi;