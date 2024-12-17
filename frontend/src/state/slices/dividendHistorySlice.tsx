import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { DividendHistory } from '@/models/FMP.model';
import { FMPApi } from '@/services/FMPApi';

interface dividendState {
    dividendHistory: DividendHistory | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: dividendState = {
    dividendHistory: null,
    isLoading: false,
    error: null
};

// Async thunk with proper typing
export const getDividendHistoryAsync = createAsyncThunk<
  DividendHistory, // Return type
  string, // Argument type
  { dispatch: AppDispatch; state: RootState } // Thunk config
>(
  'dividendHistory/fetch',
  async (symbol, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        FMPApi.endpoints.getDividendHistory.initiate(symbol)
      ).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error || 'an Error occurred');
    }
  }
);

const dividendHistorySlice = createSlice({
  name: 'dividendHistory',
  initialState,
  reducers: {
    setDividendHistory(state, action) {
      state.dividendHistory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getDividendHistoryAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDividendHistoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dividendHistory = action.payload;
      })
      .addCase(getDividendHistoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setDividendHistory } = dividendHistorySlice.actions;
export default dividendHistorySlice.reducer;