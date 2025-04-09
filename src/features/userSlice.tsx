// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for sign-in
export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(import.meta.env.VITE_API_URL);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Extract the error message if available
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Sign-in failed');
      }

      const data = await response.json();
      // Return the user data (e.g. token, user profile, etc.)
      console.log(data);
      window.localStorage.setItem('token', data.accessToken);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,    // Will hold user info (token, profile, etc.)
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // You can add synchronous reducers if needed
    resetUserStatus: (state) => {
      state.status = 'reset';
      
    },
    signOut(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      window.localStorage.removeItem('token');
      console.log('signed out');
      
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fulfilled
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to sign in';
      });
  },
});

// Export actions (for sign out, etc.)
export const { signOut } = userSlice.actions;
export const { resetUserStatus } = userSlice.actions;

// Export the reducer to add to your store
export default userSlice.reducer;
