import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from '../services'; // Adjust the path

// Async thunks for API calls using the service
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await postService.getPosts();
    return response; // Directly return the data from the service
});

export const getPostById = createAsyncThunk('posts/getPostById', async (postId) => {
    const response = await postService.getPostById(postId);
    console.log(response); // Kiểm tra dữ liệu nhận được
    return response;
});
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await postService.createPost(postData);
    return response;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ postId, postData }) => {
    const response = await postService.updatePost(postId, postData);
    return response;
});
// Create the slice
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {setCurrentPost(state, action) {
        state.currentPost = action.payload; // Lưu bài viết vào currentPost
    },
    clearCurrentPost(state) {
        state.currentPost = null; // Xóa bài viết hiện tại
    },},
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
                state.status = 'loading';
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.currentPost = action.payload; // Lưu bài viết vào currentPost
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
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
    },
});
export const { setCurrentPost, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;