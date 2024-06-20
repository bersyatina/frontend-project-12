import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.js';
import { authApi } from '../api/auth';

export default configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware),
});
