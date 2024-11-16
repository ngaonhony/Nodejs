import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, getCategoryById } from '../services/categoryService'; // Đảm bảo import đúng đường dẫn

// Tạo async thunks cho các hành động
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const categories = await getCategories();
        return categories;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id, { rejectWithValue }) => {
    try {
        const category = await getCategoryById(id);
        return category;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Tạo slice
const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedCategory(state) {
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Xuất action creators và reducer
export const { clearSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;