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
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;