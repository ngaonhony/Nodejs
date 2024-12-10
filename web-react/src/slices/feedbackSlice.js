import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createFeedback } from '../services/feedbackService'; 

export const addFeedback = createAsyncThunk(
    'feedbacks/add',
    async (feedbackData) => {
        const response = await createFeedback(feedbackData);
        return response;
    }
);
const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState: {
        feedbackList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.feedbackList.push(action.payload);
            });
    },
});

export default feedbackSlice.reducer;