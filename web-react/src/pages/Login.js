import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/authSlice'; // Cập nhật import để sử dụng authSlice
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import Footer from '../components/Footer';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
        if (storedUser) {

      navigate('/'); 
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ account, password })); // Gọi action loginUser
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full fixed-w-1200 flex justify-center"> 
          <div className="bg-white shadow-2xl rounded-lg bg-gray-100 p-10 mt-4 mb-4 max-w-[600px] w-full">
            <h1 className="text-4xl font-bold mb-8 text-center">Đăng Nhập Tài Khoản</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="account" className="block text-gray-700 mb-2 text-lg">Email hoặc Số Điện Thoại</label>
                <input 
                  type="text" 
                  id="account" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Nhập email hoặc số điện thoại của bạn" 
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2 text-lg">Mật Khẩu</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Nhập mật khẩu của bạn" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required  
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700 text-lg">Ghi nhớ tôi</span>
                </label>
                <Link to="/forget-password" className="text-blue-500 hover:underline">Quên mật khẩu?</Link>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-500 transition-all duration-300 text-lg"
                disabled={loading} // Vô hiệu hóa nút khi đang tải
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
              </button>
            </form>
            <p className="mt-6 text-center text-gray-700 text-lg">
              Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:underline">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Login;