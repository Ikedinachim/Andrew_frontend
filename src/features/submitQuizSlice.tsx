import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitQuiz = createAsyncThunk(
    'courseDetail/submitQuiz',
    async (datat, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quizzes/${datat.quizId}/submit`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
          body: JSON.stringify(datat.body),
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

  const quizSubmitSlice = createSlice({
    name: 'quizSubmit',
    initialState: {
      quizSubmitData: {},    // Will all courses
      quizSubmitStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      quizSubmitError: null,
    },
    reducers: {
      resetquizSubmitStatus: (state) => {
          state.quizSubmitStatus = 'reset';
          state.quizSubmitError = null;
        }
      // You can add synchronous reducers if needed
  
    },
    extraReducers: (builder) => {
      builder
        // Pending
        
        .addCase(submitQuiz.pending, (state) => {
          state.quizSubmitStatus = 'loading';
          state.quizSubmitError = null;
        })
        // Fulfilled
        .addCase(submitQuiz.fulfilled, (state, action) => {
          state.quizSubmitStatus = 'success';
          state.quizSubmitData = action.payload; // e.g. { token, userData } 
        })
        // Rejected
        .addCase(submitQuiz.rejected, (state, action) => {
          state.quizSubmitStatus = 'failed';
          state.quizSubmitError = action.payload || 'Unable to get quizes';
        });
    },
  });
  export const {resetquizSubmitStatus} = quizSubmitSlice.actions;
  export default quizSubmitSlice.reducer;