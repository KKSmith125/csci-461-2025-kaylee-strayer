import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    unauthenticate: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {authenticate, unauthenticate} = authSlice.actions;
export default authSlice.reducer;