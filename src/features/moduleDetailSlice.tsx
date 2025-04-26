// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

  export const getModuleDetail = createAsyncThunk(
    'module/getModuleDetail',
    async (module_id, { rejectWithValue }) => {
      try {
        console.log(import.meta.env.VITE_API_URL);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/modules/${module_id}`, {
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
const moduleDetailSlice = createSlice({
  name: 'moduleDetail',
  initialState: {
    moduleDetailData: {},    // Will hold user info (token, profile, etc.)
    moduleDetailStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    moduleDetailError: null,
  },
  reducers: {
    resetModuleDetailStatus: (state) => {
        state.moduleDetailStatus = 'reset';
        state.moduleDetailError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getModuleDetail.pending, (state) => {
        state.moduleDetailStatus = 'loading';
        state.moduleDetailError = null;
      })
      // Fulfilled
      .addCase(getModuleDetail.fulfilled, (state, action) => {
        state.moduleDetailStatus = 'success';
        state.moduleDetailData = action.payload; 
      })
      // Rejected
      .addCase(getModuleDetail.rejected, (state, action) => {
        state.moduleDetailStatus = 'failed';
        state.moduleDetailError = action.payload || 'Unable to get module detail';
      });
  },
});

// Export the reducer to add to your store
export const { resetModuleDetailStatus } = moduleDetailSlice.actions;
export default moduleDetailSlice.reducer;

