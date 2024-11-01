import axios from 'axios';

// Định nghĩa API endpoint với cổng
const API_URL = 'http://localhost:3000/api/auth/login'; // Cập nhật URL với cổng

// Hàm gọi API để đăng nhập
export const login = async (account, password) => {
  try {
    const response = await axios.post(API_URL, { account, password });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi và trả về thông báo phù hợp
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};

export const register = async (userData) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', userData);
    return response.data;
  };