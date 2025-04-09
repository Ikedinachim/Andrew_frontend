import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createNewQuiz = createAsyncThunk(
  'courseDetail/createNewQuiz',
  async (moduleId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quizzes/module/${moduleId}/generate`, {
        method: 'POST',
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


const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizData: {},    // Will all courses
    quizStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    quizError: null,
  },
  reducers: {
    resetQuizStatus: (state) => {
        state.quizStatus = 'reset';
        state.quizError = null;
      }
    // You can add synchronous reducers if needed

  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(createNewQuiz.pending, (state) => {
        state.quizStatus = 'loading';
        state.quizError = null;
      })
      // Fulfilled
      .addCase(createNewQuiz.fulfilled, (state, action) => {
        state.quizStatus = 'success';
        state.quizData = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(createNewQuiz.rejected, (state, action) => {
        state.quizStatus = 'failed';
        state.quizError = action.payload || 'Unable to get quizes';
      });
  },
});
export const {resetQuizStatus} = quizSlice.actions;
export default quizSlice.reducer;