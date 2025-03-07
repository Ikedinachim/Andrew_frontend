import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSingleCourse = createAsyncThunk(
  'courseDetail/getSingleCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/courses/${courseId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
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


const courseDetailSlice = createSlice({
  name: 'course',
  initialState: {
    course: {},    // Will all courses
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // You can add synchronous reducers if needed

  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getSingleCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fulfilled
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.status = 'success';
        state.course = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(getSingleCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to get courses';
      });
  },
});


// Export the reducer to add to your store
export default courseDetailSlice.reducer;