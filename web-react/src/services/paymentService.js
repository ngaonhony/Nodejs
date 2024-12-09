import axios from 'axios';

const API_URL = 'http://localhost:3000/api/payments'; // Địa chỉ API của bạn

// Hàm để lấy bài đăng và thanh toán theo userId
export const getPostsAndPaymentsByUserId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
            throw new Error('User ID not found in localStorage'); // Kiểm tra nếu không có userId
        }

        const response = await axios.get(`${API_URL}/${user._id}`);
        return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
        // Xử lý lỗi và ném ra thông điệp
        throw error.response?.data?.message || error.message;
    }
};