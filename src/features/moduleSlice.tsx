// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourse } from './courseSlice';

// Async thunk for sign-in
export const generateModule = createAsyncThunk(
  'module/generate',
  async (course_id, { rejectWithValue }) => {
    try {
      console.log(import.meta.env.VITE_API_URL);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/modules/generate/${course_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
        
        
      });

      if (!response.ok) {
        // Extract the error message if available
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Module Generation Failed');
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

export const getModules = createAsyncThunk(
    'module/get',
    async (course_id, { rejectWithValue }) => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/modules/course/${course_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
          
          
        });
  
        if (!response.ok) {
          // Extract the error message if available
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Retrieving Modules Failed');
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


  export const getAllModules = createAsyncThunk(
    'module/getAllModules',
    async (course_id, { rejectWithValue }) => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/modules??page=1&limit=5`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
          
          
        });
  
        if (!response.ok) {
          // Extract the error message if available
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Retrieving Modules Failed');
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
const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    moduleData: {},    // Will hold user info (token, profile, etc.)
    moduleStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    moduleError: null,
  },
  reducers: {
    resetModuleStatus: (state) => {
        state.moduleStatus = 'reset';
        state.moduleError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(generateModule.pending, (state) => {
        state.moduleStatus = 'loading';
        state.moduleError = null;
      })
      // Fulfilled
      .addCase(generateModule.fulfilled, (state, action) => {
        state.moduleStatus = 'success';
        state.moduleData = action.payload; 
      })
      // Rejected
      .addCase(generateModule.rejected, (state, action) => {
        state.moduleStatus = 'failed';
        state.moduleError = action.payload || 'Unable to generate module';
      })
      // Pending
      .addCase(getModules.pending, (state) => {
        state.moduleStatus = 'loading';
        state.moduleError = null;
      })
      // Fulfilled
      .addCase(getModules.fulfilled, (state, action) => {
        state.moduleStatus = 'success';
        state.moduleData = action.payload; 
      })
      // Rejected
      .addCase(getModules.rejected, (state, action) => {
        state.moduleStatus = 'failed';
        state.moduleError = action.payload || 'Unable to generate module';
      })
      .addCase(getAllModules.pending, (state) => {
        state.moduleStatus = 'loading';
        state.moduleError = null;
      })
      // Fulfilled
      .addCase(getAllModules.fulfilled, (state, action) => {
        state.moduleStatus = 'success';
        state.moduleData = action.payload; 
      })
      // Rejected
      .addCase(getAllModules.rejected, (state, action) => {
        state.moduleStatus = 'failed';
        state.moduleError = action.payload || 'Unable to fetch modules';
      });

     
  },
});

// Export the reducer to add to your store
export const { resetModuleStatus } = moduleSlice.actions;
export default moduleSlice.reducer;

