import { configureStore } from "@reduxjs/toolkit"; 

import { stocksApi } from "../services/StocksApi";
import { portfoliosApi } from "@/services/PortfoliosApi";

export default configureStore({
    reducer: {
        [stocksApi.reducerPath]: stocksApi.reducer,
        [portfoliosApi.reducerPath]: portfoliosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([stocksApi.middleware, portfoliosApi.middleware])
});