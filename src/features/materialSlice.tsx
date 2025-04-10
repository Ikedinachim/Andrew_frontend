import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// delete course
export const deleteCourseMaterial= createAsyncThunk(
    'material/deleteCourseMaterial',
    async (id , { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/materials/${id.materialId}`, {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
          body: JSON.stringify({courseId: id.courseId})
        });
        console.log('deleted tried');
        
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
  
  // delete course
export const uploadCourseMaterial= createAsyncThunk(
  'material/uploadCoursematerial',
  async (body , { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/materials`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: body
      });
      console.log('upload material');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to upload material');
      }

      const data = await response.json();
      console.log(data);    
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  
  const materialSlice = createSlice({
    name: 'material',
    initialState: {
      materialData: {},    // Will all courses
      materialStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      materialError: null,
    },
    reducers: {
      // You can add synchronous reducers if needed
      resetMaterialStatus: (state) => {
        state.materialData = 'idle';
        state.materialError = null;
      }
  
    },
    extraReducers: (builder) => {
      builder
       // Pending
       .addCase(deleteCourseMaterial.pending, (state) => {
        state.materialStatus = 'loading';
        state.materialError = null;
      })
      // Fulfilled
      .addCase(deleteCourseMaterial.fulfilled, (state, action) => {
        state.materialStatus = 'success';
        state.materialData = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(deleteCourseMaterial.rejected, (state, action) => {
        state.materialStatus = 'failed';
        state.materialError = action.payload || 'Unable to get courses';
      })
      // Pending
      .addCase(uploadCourseMaterial.pending, (state) => {
        state.materialStatus = 'loading';
        state.materialError = null;
      })
      // Fulfilled
      .addCase(uploadCourseMaterial.fulfilled, (state, action) => {
        state.materialStatus = 'success';
        state.materialData = action.payload; // e.g. { token, userData } 
      })
      // Rejected
      .addCase(uploadCourseMaterial.rejected, (state, action) => {
        state.materialStatus = 'failed';
        state.materialError = action.payload || 'Unable to upload material';
      })
       
    },
  });
  
  
  // Export the reducer to add to your store
  export const { resetMaterialStatus } = materialSlice.actions;
  export default materialSlice.reducer;