import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    trainer: null
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.trainer = action.payload;
    },
    unauthenticate: (state, action) => {
      state.isAuthenticated = false;
      state.trainer = null;
    },
  },
});

export const {authenticate, unauthenticate} = authSlice.actions;
export default authSlice.reducer;