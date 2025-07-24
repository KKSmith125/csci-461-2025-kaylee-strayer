import {configureStore} from '@reduxjs/toolkit';

import reducer from './components/slices/authSlice';

const store = configureStore({
  reducer: {
    auth: reducer
  }
});

export default store;