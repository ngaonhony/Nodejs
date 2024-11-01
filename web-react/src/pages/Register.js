import React, { useState } from "react";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService"; // Giả sử bạn có một hàm register trong authService

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra xem mật khẩu và xác nhận có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await register({ username, email, password });
      // Giả sử API trả về người dùng đã đăng ký thành công
      if (response.user) {
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
      }
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage = err.response?.data?.message || 'Đăng ký thất bại';
      setError(errorMessage); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className=''>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="flex flex-col h-screen items-center bg-gray-100 font-sans leading-normal tracking-normal">
        <div className="bg-white shadow-2xl rounded-lg p-10 mt-4 mb-4 max-w-[600px] w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Đăng Ký Tài Khoản</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Tên Đăng Nhập
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Mật Khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 mb-2">
                Xác Nhận Mật Khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-500 transition-all duration-300">
              Đăng Ký
            </button>
          </form>
          <p className="mt-6 text-center text-gray-700">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Register;