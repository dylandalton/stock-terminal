import { configureStore } from "@reduxjs/toolkit"; 
import { stocksApi } from "../services/StocksApi";
import { portfoliosApi } from "@/services/PortfoliosApi";
import userReducer from './slices/userSlice';
import { polygonApi } from "@/services/PolygonApi";

export default configureStore({
    reducer: {
        [stocksApi.reducerPath]: stocksApi.reducer,
        [portfoliosApi.reducerPath]: portfoliosApi.reducer,
        [polygonApi.reducerPath]: polygonApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([stocksApi.middleware, portfoliosApi.middleware, polygonApi.middleware])
});