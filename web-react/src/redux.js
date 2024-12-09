import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Đảm bảo import đúng đường dẫn
import categoryReducer from './slices/categorySlice';
import servicesReducer from './slices/serviceSlice';
import postReducer from './slices/postSlice';
import paymentReducer from './slices/paymentSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        services: servicesReducer,
        posts: postReducer,
        payments: paymentReducer,
    },
});

export default store;