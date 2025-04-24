// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import courseReducer from '../features/courseSlice';
import moduleReducer from '../features/moduleSlice';
import quizReducer from '../features/quizSlice';
import materialReducer from '../features/materialSlice';
import courseDetailReducer from '../features/courseDetailSlice';
import moduleDetailReducer from '../features/moduleDetailSlice';
import reportReducer from '../features/reportSlice';
import quizSubmitReducer from '../features/submitQuizSlice';
import recentActivityReducer from '../features/recentActivitySlice';
import recommendationReducer from '../features/recommendationSlice';

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
    course: courseReducer,
    courseDetail: courseDetailReducer,
    module: moduleReducer,
    quiz: quizReducer,
    moduleDetail: moduleDetailReducer,
    material: materialReducer,
    report: reportReducer,
    quizSubmit: quizSubmitReducer,
    recentActivity: recentActivityReducer,
    recommendation: recommendationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
