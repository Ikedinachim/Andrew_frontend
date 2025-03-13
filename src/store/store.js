// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import courseReducer from '../features/courseSlice';
import courseDetailReducer from '../features/courseDetailSlice';

// Persist config for each reducer
const counterPersistConfig = {
  key: 'counter',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const coursePersistConfig = {
  key: 'course',
  storage,
};

const courseDetailPersistConfig = {
  key: 'courseDetail',
  storage,
};

// Create persisted reducers
const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCourseReducer = persistReducer(coursePersistConfig, courseReducer);
const persistedCourseDetailReducer = persistReducer(courseDetailPersistConfig, courseDetailReducer);

export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    user: persistedUserReducer,
    course: persistedCourseReducer,
    courseDetail: persistedCourseDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
