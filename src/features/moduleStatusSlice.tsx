import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const markModuleCompleted = createAsyncThunk(
    'moduleStatus/markModuleCompleted',
    async (moduleId: string, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/modules/${moduleId}/mark-completed`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
          // body: JSON.stringify({
          //   isCompleted: true
          // })
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Failed to fetch course');
        }
  
        const data = await response.json();
        console.log(data);    
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const moduleStatusSlice = createSlice({
  name: 'moduleStatus',
  initialState: {
    moduleStatusData: {},    // Will hold user info (token, profile, etc.)
    moduleStatusStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    moduleStatusError: null,
  },
  reducers: {
    resetModuleStatusStatus: (state) => {
        state.moduleStatusStatus = 'idle';
        state.moduleStatusError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(markModuleCompleted.pending, (state) => {
        state.moduleStatusStatus = 'loading';
        state.moduleStatusError = null;
      })
      // Fulfilled
      .addCase(markModuleCompleted.fulfilled, (state, action) => {
        state.moduleStatusStatus = 'success';
        state.moduleStatusData = action.payload; 
      })
      // Rejected
      .addCase(markModuleCompleted.rejected, (state, action) => {
        state.moduleStatusStatus = 'failed';
        state.moduleStatusError = action.payload || 'Unable to get module detail';
      });
  },
});

// Export the reducer to add to your store
export const { resetModuleStatusStatus } = moduleStatusSlice.actions;
export default moduleStatusSlice.reducer;

