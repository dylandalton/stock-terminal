import { configureStore } from "@reduxjs/toolkit"; 
import { stocksApi } from "../services/StocksApi";
import { portfoliosApi } from "@/services/PortfoliosApi";
import userReducer from './slices/userSlice';
import { polygonApi } from "@/services/PolygonApi";

const store = configureStore({
    reducer: {
        [stocksApi.reducerPath]: stocksApi.reducer,
        [portfoliosApi.reducerPath]: portfoliosApi.reducer,
        [polygonApi.reducerPath]: polygonApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([stocksApi.middleware, portfoliosApi.middleware, polygonApi.middleware])
});

// Export typed versions of `dispatch` and `state`
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;