import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPostsById = createAsyncThunk(
  'posts/fetchPostsById',
  async (id: any, thunkAPI) => {
    console.log("🚀 ~ file: postsSliceThunk.ts:6 ~ id:", id)
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP ERROR! status: ${response.status}`);
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: {},
};

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostsById.fulfilled, (state, action) => {
        state.posts = action.payload;
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(getPostsById.rejected, (state, action) => {
        state.error = action.error;
        console.error(action.error);
      });
  },
});

export default postsSlice.reducer;
