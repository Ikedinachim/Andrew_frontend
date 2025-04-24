// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

  export const getRecentActivity = createAsyncThunk(
    'module/getRecentActivity',
    async (_, { rejectWithValue }) => {
      try {
        console.log(import.meta.env.VITE_API_URL);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activities/recent?days=100`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
          
          
        });
  
        if (!response.ok) {
          // Extract the error message if available
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Failed to get Module Detail');
        }
  
        const data = await response.json();
        // Return the user data (e.g. token, user profile, etc.)
        console.log(data);
        
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
const recentActivitySlice = createSlice({
  name: 'recentActivity',
  initialState: {
    recentActivityData: {},    // Will hold user info (token, profile, etc.)
    recentActivityStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    recentActivityError: null,
  },
  reducers: {
    resetRecentActivityStatus: (state) => {
        state.recentActivityStatus = 'reset';
        state.recentActivityError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getRecentActivity.pending, (state) => {
        state.recentActivityStatus = 'loading';
        state.recentActivityError = null;
      })
      // Fulfilled
      .addCase(getRecentActivity.fulfilled, (state, action) => {
        state.recentActivityStatus = 'success';
        state.recentActivityData = action.payload; 
      })
      // Rejected
      .addCase(getRecentActivity.rejected, (state, action) => {
        state.recentActivityStatus = 'failed';
        state.recentActivityError = action.payload || 'Unable to get module detail';
      });
  },
});

// Export the reducer to add to your store
export const { resetRecentActivityStatus } = recentActivitySlice.actions;
export default recentActivitySlice.reducer;

