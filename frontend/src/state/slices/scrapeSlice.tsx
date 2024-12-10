import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { portfoliosApi } from '@/services/PortfoliosApi';
import { AppDispatch, RootState } from '../store';

export interface ArticleScrapeResponse{
    title: string;
    author: string;
    articleText: string;
}

interface ScrapeState {
  scrapedArticles: ArticleScrapeResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ScrapeState = {
  scrapedArticles: [],
  isLoading: false,
  error: null
};

export const getScrapeAsync = createAsyncThunk<
ArticleScrapeResponse, // Return type
  { articleUrl: string }, // Argument type
  { dispatch: AppDispatch; state: RootState } // Thunk config
>(
  'scrape/getScrape',
  async ({ articleUrl }, { dispatch, rejectWithValue }) => {
    try {
      const response: ArticleScrapeResponse = await dispatch(
        portfoliosApi.endpoints.getScrape.initiate(articleUrl)
      ).unwrap();

      const scrapedArticle: ArticleScrapeResponse = response;

      return scrapedArticle;
    } catch (error) {
      return rejectWithValue('Failed to scrape article');
    }
  }
);

const scrapeSlice = createSlice({
  name: 'scrape',
  initialState,
  reducers: {
    clearScrapedArticle(state) {
      state.scrapedArticles = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getScrapeAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getScrapeAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.scrapedArticles.push(action.payload);
    })
    .addCase(getScrapeAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || 'Failed to scrape article';
    });
  },
});

export const { clearScrapedArticle } = scrapeSlice.actions;
export default scrapeSlice.reducer;