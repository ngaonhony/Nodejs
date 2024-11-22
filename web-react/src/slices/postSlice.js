import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from '../services'; // Adjust the path

// Async thunks for API calls using the service
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await postService.getPosts();
    return response; // Directly return the data from the service
});

export const getPostById = createAsyncThunk('posts/getPostById', async (postId) => {
    const response = await postService.getPostById(postId);
    return response;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await postService.createPost(postData);
    return response;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
    const response = await postService.updatePost(id, postData);
    return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await postService.deletePost(id);
    return id; // Return the id of the deleted post
});

// Create the slice
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setUser(state, action) {
          state.user = action.payload;
          // Save user to local storage
          localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser(state) {
          state.user = null; // Reset user to null
          localStorage.removeItem('user'); // Clear from local storage
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getPostById.pending, (state) => {
              state.loading = true; 
          })
          .addCase(getPostById.fulfilled, (state, action) => {
              state.loading = false; 
              const existingIndex = state.posts.findIndex(post => post._id === action.payload._id);
              if (existingIndex !== -1) {
                  state.posts[existingIndex] = action.payload; 
              } else {
                  state.posts.push(action.payload); 
              }
          })
          .addCase(getPostById.rejected, (state, action) => {
              state.loading = false; // Clear loading state
              state.error = action.error.message; // Set error message
          })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

// Export the reducer to be used in the store
export default postsSlice.reducer;