import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { portfoliosApi } from "@/services/PortfoliosApi";

export interface ArticlesScrapedResponse{
    title: string;
    author: string;
    url?: string;
}

interface ScrapeState {
    scrapedArticlesArray: ArticlesScrapedResponse[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ScrapeState = {
    scrapedArticlesArray: [],
    isLoading: false,
    error: null
};
  
export const getScrapedArticlesAsync = createAsyncThunk<
    ArticlesScrapedResponse[],
    { symbol: string;},
    { dispatch: AppDispatch; state: RootState }
>(
'scrapedArticles/getScrapedArticles',
async({symbol}, {dispatch, rejectWithValue}) => {
        try{
            const response: ArticlesScrapedResponse[] = await dispatch(
                portfoliosApi.endpoints.getScrapedArticles.initiate(symbol)
            ).unwrap();
            return response;
        } catch (error) {
            return rejectWithValue('Failed to scrape articles');
        }
    }
);

const scrapedArticlesSlice = createSlice({
    name: 'scrapedArticles',
    initialState,
    reducers: {
        clearScrapedArticles(state) {
            state.scrapedArticlesArray = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getScrapedArticlesAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getScrapedArticlesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.scrapedArticlesArray = action.payload;
        })
        .addCase(getScrapedArticlesAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to scrape article';
        });
    }
})

export const { clearScrapedArticles } = scrapedArticlesSlice.actions;
export default scrapedArticlesSlice.reducer;