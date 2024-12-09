import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { portfoliosApi } from '@/services/PortfoliosApi';
import { AppDispatch, RootState } from '../store';

interface ScrapeState {
  scrapedArticle: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ScrapeState = {
  scrapedArticle: null,
  isLoading: false,
  error: null
};

export const getScrapeAsync = createAsyncThunk<
  { scrapedContent: string; }, // Return type
  { articleUrl: string }, // Argument type
  { dispatch: AppDispatch; state: RootState } // Thunk config
>(
  'scrape/getScrape',
  async ({ articleUrl }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        portfoliosApi.endpoints.getScrape.initiate(articleUrl)
      ).unwrap();
      return { scrapedContent: response };
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
      state.scrapedArticle = null;
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
        state.scrapedArticle = action.payload.scrapedContent;
      })
      .addCase(getScrapeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to scrape article';
        state.scrapedArticle = null;
      });
  },
});

export const { clearScrapedArticle } = scrapeSlice.actions;
export default scrapeSlice.reducer;