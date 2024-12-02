import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentHoldingState {
    symbol: string;
    companyName: string | undefined;
  }
  
  const initialState: CurrentHoldingState = {
    symbol: '',
    companyName: ''
  };

const currentHoldingSlice = createSlice({
    name: 'currentHolding',
    initialState,
    reducers: {
        setCurrentHolding: (state, action: PayloadAction<CurrentHoldingState>) => {
            state.symbol = action.payload.symbol;
            state.companyName = action.payload.companyName;
        },
        clearCurrentHolding: (state) => {
            state.symbol = '';
            state.companyName = '';
        }
    }
})

export const {
    setCurrentHolding,
    clearCurrentHolding
} = currentHoldingSlice.actions;
export default currentHoldingSlice.reducer;