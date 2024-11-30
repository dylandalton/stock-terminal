import { User } from '@/models/User';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  selectedUser: User | null;
}

const initialState: UserState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    addHolding(state, action) {
      if (state.selectedUser) {
        state.selectedUser.holdings.push(action.payload);
      }
    },
  },
});

export const { setSelectedUser, addHolding } = userSlice.actions;
export default userSlice.reducer;