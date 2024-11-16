import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, verifyCode, resendVerificationCode } from '../services/authService'; // Đảm bảo import đúng đường dẫn

// Tạo async thunks cho các hành động
export const loginUser = createAsyncThunk('auth/login', async ({ account, password }, { rejectWithValue }) => {
    try {
        const response = await login(account, password);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await register(userData);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const verifyUserCode = createAsyncThunk('auth/verify', async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
        const response = await verifyCode(email, verificationCode);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const resendVerification = createAsyncThunk('auth/resend', async (email, { rejectWithValue }) => {
    try {
        const response = await resendVerificationCode(email);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Tạo slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // Bạn có thể lưu thông tin người dùng nếu cần
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyUserCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserCode.fulfilled, (state, action) => {
                state.loading = false;
                // Xử lý thông tin xác thực nếu cần
            })
            .addCase(verifyUserCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resendVerification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendVerification.fulfilled, (state, action) => {
                state.loading = false;
                // Xử lý phản hồi nếu cần
            })
            .addCase(resendVerification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Xuất action creators và reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;