import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../services/postService';

// Async Thunks
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await getPosts();
  return response;
});

export const fetchPostById = createAsyncThunk('post/fetchPostById', async (id) => {
  const response = await getPostById(id);
  return response;
});

export const addPost = createAsyncThunk('post/addPost', async (postData) => {
  const response = await createPost(postData);
  return response;
});

export const editPost = createAsyncThunk('post/editPost', async ({ id, postData }) => {
  const response = await updatePost(id, postData);
  return response;
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  const response = await deletePost(id);
  return response;
});

// Slice
const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null,
    isItemFavorited: false,
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    toggleFavorite: (state) => {
      state.isItemFavorited = !state.isItemFavorited;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        state.posts[index] = action.payload;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload._id);
      });
  },
});

export const { setCurrentPost, toggleFavorite } = postSlice.actions;
export default postSlice.reducer;