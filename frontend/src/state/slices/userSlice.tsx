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
  isDeletingHolding: boolean;
  addHoldingError: string | null;
  deleteHoldingError: string | null;
}

const initialState: UserState = {
  selectedUser: null,
  isAddingHolding: false,
  isDeletingHolding: false,
  addHoldingError: null,
  deleteHoldingError: null,
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

// AsyncThunk is a function that returns a thunk
// the thunks returned are actually promise-based objects that 
// return an object that represents the result of the asynchronous operation.
export const deleteHoldingAsync = createAsyncThunk<
  { response: any; symbol: string },
  { userId: string; symbol: string },
  { dispatch: AppDispatch; state: RootState }
>(
  'user/deleteHolding',
  async({ userId, symbol }, { dispatch, rejectWithValue}) => {
    try {
      const response = await dispatch(
        portfoliosApi.endpoints.deleteHolding.initiate({ userId, symbol })
      ).unwrap();
      return { response, symbol }
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
      })
      .addCase(deleteHoldingAsync.pending, (state) => {
        state.isDeletingHolding = true;
        state.deleteHoldingError = null;
      })
      .addCase(deleteHoldingAsync.fulfilled, (state, action) => {
        state.isDeletingHolding = false;
        if (state.selectedUser) {
          state.selectedUser.holdings = state.selectedUser.holdings.filter(
            holding => holding.symbol !== action.payload.symbol
          );
        }
      })
      .addCase(deleteHoldingAsync.rejected, (state, action) => {
        state.isDeletingHolding = false;
        state.deleteHoldingError = action.payload as string;
      });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;