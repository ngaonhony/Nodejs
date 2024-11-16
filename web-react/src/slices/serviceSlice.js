import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllServices} from '../services/serviceService'; // Ensure the path is correct

// Async thunk for fetching all services
export const fetchServices = createAsyncThunk('services/fetchServices', async (_, { rejectWithValue }) => {
    try {
        const services = await getAllServices();
        return services;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Create the slice for services
const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        selectedService: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedService(state) {
            state.selectedService = null; // Clear the selected service
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true; // Set loading state
                state.error = null;   // Reset any previous errors
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false; // Loading finished
                state.services = action.payload; // Update services with fetched data
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false; // Loading finished with error
                state.error = action.payload; // Store error message
            })
    },
});

// Export action creators and reducer
export const { clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;