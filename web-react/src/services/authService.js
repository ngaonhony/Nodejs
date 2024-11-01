import axios from 'axios';

// Định nghĩa API endpoint với cổng
const API_URL = 'http://localhost:3000/api/auth'; // Cập nhật URL với cổng

// Hàm gọi API để đăng nhập
export const login = async (account, password) => {
  try {
    // Determine if the account is an email or phone
    const isEmail = /\S+@\S+\.\S+/.test(account);
    
    const response = await axios.post(`${API_URL}/login`, 
      { 
        [isEmail ? 'email' : 'phone']: account,
        password 
      }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};

// Hàm gọi API để đăng ký
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi và trả về thông báo phù hợp
    console.error('Registration error:', error.response?.data); // Log chi tiết lỗi
    const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};

export const verifyCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, {
      email, // Include the email in the request
      verificationCode, // Include the verification code
    });
    return response.data; // Return the data from the server
  } catch (error) {
    // Handle error and return appropriate message
    console.error('Verification error:', error.response?.data); // Log detailed error
    const errorMessage = error.response?.data?.message || 'Xác thực thất bại';
    throw new Error(errorMessage); // Throw error with specific message
  }
};