import axios from 'axios';

// Định nghĩa API endpoint với cổng
const API_URL = 'http://localhost:3000/api/auth'; // Cập nhật URL với cổng

// Hàm gọi API để đăng nhập
export const login = async (account, password) => {
  try {
    // Xác định xem tài khoản là email hay số điện thoại
    const isEmail = /\S+@\S+\.\S+/.test(account);
    
    const response = await axios.post(`${API_URL}/login`, 
      { 
        [isEmail ? 'email' : 'phone']: account,
        password 
      }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    const { accessToken, user } = response.data; // Lấy token và thông tin người dùng từ phản hồi
    return { accessToken, user };
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
      email, // Bao gồm email trong yêu cầu
      verificationCode, // Bao gồm mã xác thực
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi và trả về thông báo phù hợp
    console.error('Verification error:', error.response?.data); // Log chi tiết lỗi
    const errorMessage = error.response?.data?.message || 'Xác thực thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend`, {
      email, // Gửi email để gửi lại mã
    });
    return response.data; // Trả về phản hồi từ server
  } catch (error) {
    console.error('Resend code error:', error.response?.data); // Log lỗi
    const errorMessage = error.response?.data?.message || 'Gửi mã xác thực thất bại';
    throw new Error(errorMessage); // Ném lỗi với thông điệp cụ thể
  }
};