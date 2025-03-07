// src/features/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for sign-in
export const getAllCourse = createAsyncThunk(
  'course/getAllCourse',
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch('http://localhost:3000/api/v1/courses?limit=10', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        // Extract the error message if available
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Sign-in failed');
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

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: {},    // Will all courses
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // You can add synchronous reducers if needed

  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getAllCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fulfilled
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.status = 'success';
        state.courses = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(getAllCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to get courses';
      });
  },
});


// Export the reducer to add to your store
export default courseSlice.reducer;
