// src/features/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for sign-in
export const getAllCourse = createAsyncThunk(
  'course/getAllCourse',
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses?limit=10`, {
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
export const uploadCourse = createAsyncThunk(
  'course/uploadCourse',
  async (courseData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: courseData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Course upload failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Modify the courseSlice to include upload status
const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    uploadStatus: 'idle', // Add this to track upload status separately
    error: null,
  },
  reducers: {
    // Synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Existing getAllCourse cases
      .addCase(getAllCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.status = 'success';
        state.courses = action.payload;
      })
      .addCase(getAllCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to get courses';
      })
      // Add new uploadCourse cases
      .addCase(uploadCourse.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadCourse.fulfilled, (state, action) => {
        state.uploadStatus = 'success';
        // Add the newly uploaded course to the courses state
        if (Array.isArray(state.courses.data)) {
          state.courses.data.push(action.payload.data);
        }
      })
      .addCase(uploadCourse.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload || 'Unable to upload course';
        console.log(state.error);
        
      });
  },
});


// Export the reducer to add to your store
export default courseSlice.reducer;
