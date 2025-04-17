// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const getAllReports = createAsyncThunk(
    'report/getAllReports',
    async (user_id, { rejectWithValue }) => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quizzes`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
          
          
        });
  
        if (!response.ok) {
          // Extract the error message if available
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Retrieving reports Failed');
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

  export const getQuizReport = createAsyncThunk(
    'report/getQuizReport',
    async (quiz_id, { rejectWithValue }) => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quizzes/${quiz_id}/report`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
          
          
        });
  
        if (!response.ok) {
          // Extract the error message if available
          const errorData = await response.json().catch(() => ({}));
          return rejectWithValue(errorData.message || 'Retrieving reports Failed');
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
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    reportData: {},    // Will hold user info (token, profile, etc.)
    reportStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    reportError: null,
  },
  reducers: {
    resetReportStatus: (state) => {
        state.reportStatus = 'idle';
        state.reportError = null;
      }
    // You can add synchronous reducers if needed
  
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getAllReports.pending, (state) => {
        state.reportStatus = 'loading';
        state.reportError = null;
      })
      // Fulfilled
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.reportStatus = 'success';
        state.reportData = action.payload; 
      })
      // Rejected
      .addCase(getAllReports.rejected, (state, action) => {
        state.reportStatus = 'failed';
        state.reportError = action.payload || 'Unable to generate report';
      })
      .addCase(getQuizReport.pending, (state) => {
        state.reportStatus = 'loading';
        state.reportError = null;
      })
      // Fulfilled
      .addCase(getQuizReport.fulfilled, (state, action) => {
        state.reportStatus = 'success';
        state.reportData = action.payload; 
      })
      // Rejected
      .addCase(getQuizReport.rejected, (state, action) => {
        state.reportStatus = 'failed';
        state.reportError = action.payload || 'Unable to generate report';
      });
  }});


// Export the reducer to add to your store
export const { resetReportStatus } = reportSlice.actions;
export default reportSlice.reducer;