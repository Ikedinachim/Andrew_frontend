// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

  export const getRecommendation = createAsyncThunk(
    'module/getRecommendation',
    async (_, { rejectWithValue }) => {
      try {
        console.log(import.meta.env.VITE_API_URL);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activities/recommendations`, {
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
const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    recommendationData: {},    // Will hold user info (token, profile, etc.)
    recommendationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    recommendationError: null,
  },
  reducers: {
    resetRecommendationStatus: (state) => {
        state.recommendationStatus = 'reset';
        state.recommendationError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getRecommendation.pending, (state) => {
        state.recommendationStatus = 'loading';
        state.recommendationError = null;
      })
      // Fulfilled
      .addCase(getRecommendation.fulfilled, (state, action) => {
        state.recommendationStatus = 'success';
        state.recommendationData = action.payload; 
      })
      // Rejected
      .addCase(getRecommendation.rejected, (state, action) => {
        state.recommendationStatus = 'failed';
        state.recommendationError = action.payload || 'Unable to get module detail';
      });
  },
});

// Export the reducer to add to your store
export const { resetRecommendationStatus } = recommendationSlice.actions;
export default recommendationSlice.reducer;

