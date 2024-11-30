import { Holding } from '@/models/User';
import { portfoliosApi } from '@/services/PortfoliosApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface UserState {
  selectedUser: {
    _id: string;
    holdings: Holding[];
  } | null;
  isAddingHolding: boolean;
  addHoldingError: string | null;
}

const initialState: UserState = {
  selectedUser: null,
  isAddingHolding: false,
  addHoldingError: null,
};

// Async thunk with proper typing
export const createHoldingAsync = createAsyncThunk<
  { holdingData: Holding; response: any }, // Return type
  { userId: string; holdingData: Holding }, // Argument type
  { dispatch: AppDispatch; state: RootState } // Thunk config
>(
  'user/createHolding',
  async ({ userId, holdingData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        portfoliosApi.endpoints.createHolding.initiate({ userId, holdingData })
      ).unwrap();
      return { holdingData, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHoldingAsync.pending, (state) => {
        state.isAddingHolding = true;
        state.addHoldingError = null;
      })
      .addCase(createHoldingAsync.fulfilled, (state, action) => {
        state.isAddingHolding = false;
        if (state.selectedUser) {
          state.selectedUser.holdings.push(action.payload.holdingData);
        }
      })
      .addCase(createHoldingAsync.rejected, (state, action) => {
        state.isAddingHolding = false;
        state.addHoldingError = action.payload as string;
      });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;