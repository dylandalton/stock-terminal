import { configureStore } from "@reduxjs/toolkit"; 
import { stocksApi } from "../services/StocksApi";
import { portfoliosApi } from "@/services/PortfoliosApi";
import userReducer from './slices/userSlice';
import addModalReducer from './slices/addModalSlice';
import deleteModalReducer from './slices/deleteModalSlice';
import currentHoldingReducer from './slices/currentHoldingSlice';
import modifyModalReducer from './slices/modifyModalSlice';
import scrapeReducer from './slices/scrapeSlice';
import { polygonApi } from "@/services/PolygonApi";
import { alphaVantageApi } from "@/services/AlphaVantageApi";

const store = configureStore({
    reducer: {
        [stocksApi.reducerPath]: stocksApi.reducer,
        [portfoliosApi.reducerPath]: portfoliosApi.reducer,
        [polygonApi.reducerPath]: polygonApi.reducer,
        [alphaVantageApi.reducerPath] : alphaVantageApi.reducer,
        user: userReducer,
        addModal: addModalReducer,
        deleteModal: deleteModalReducer,
        modifyModal: modifyModalReducer,
        currentHolding: currentHoldingReducer,
        scrape: scrapeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            [
                stocksApi.middleware, 
                portfoliosApi.middleware, 
                polygonApi.middleware, 
                alphaVantageApi.middleware
            ]
        )
});

// Export typed versions of `dispatch` and `state`
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;