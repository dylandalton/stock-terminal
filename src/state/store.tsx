import { configureStore } from "@reduxjs/toolkit"; 

import { stocksApi } from "../services/StocksApi";

export default configureStore({
    reducer: {
        [stocksApi.reducerPath]: stocksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(stocksApi.middleware)
});