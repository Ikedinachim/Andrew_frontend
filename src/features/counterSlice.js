// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows direct 'mutation' of state
      // because it uses the Immer library under the hood
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Export the generated actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer (will be used in store.js)
export default counterSlice.reducer;
