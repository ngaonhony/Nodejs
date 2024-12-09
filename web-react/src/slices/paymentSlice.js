import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsAndPaymentsByUserId } from '../services/paymentService';

export const fetchPostsAndPayments = createAsyncThunk(
    'payments/fetchPostsAndPayments',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getPostsAndPaymentsByUserId(); // Gọi hàm mà không cần tham số
            return data; // Trả về dữ liệu nhận được từ API
        } catch (error) {
            return rejectWithValue(error.message); // Xử lý lỗi và trả về thông điệp lỗi
        }
    }
);
// Tạo slice
const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        postsAndPayments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAndPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsAndPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.postsAndPayments = action.payload; // Lưu dữ liệu nhận được
            })
            .addCase(fetchPostsAndPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch'; // Lưu thông điệp lỗi
            });
    },
});

// Xuất reducer
export default paymentSlice.reducer;