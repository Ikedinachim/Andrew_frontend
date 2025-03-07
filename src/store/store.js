// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import courseReducer from '../features/courseSlice';
import courseDetailReducer from '../features/courseDetailSlice';


export const store = configureStore({
  reducer: {
    // You can add more slices here as your app grows
    counter: counterReducer,
    user: userReducer,
    course:courseReducer,
    courseDetail: courseDetailReducer,
  },
});
