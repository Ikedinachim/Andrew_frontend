// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';


export const store = configureStore({
  reducer: {
    // You can add more slices here as your app grows
    counter: counterReducer,
    user: userReducer,
  },
});
