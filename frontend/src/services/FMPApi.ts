import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DividendHistory } from "@/models/FMP.model";

const baseUrl = import.meta.env.VITE_FMP_API_URL || '';
const apiKey = import.meta.env.VITE_FMP_API_KEY || '';

export const FMPApi = createApi({
    reducerPath: 'FMP',
    baseQuery: fetchBaseQuery({
      baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
      getDividendHistory: builder.query<DividendHistory, string>({
        query: (symbol) =>({
          url: `/v3/historical-price-full/stock_dividend/${symbol}?apikey=${apiKey}`,
          method: 'GET'
        })
      })
    })
  });

export const {
    useGetDividendHistoryQuery
} = FMPApi;