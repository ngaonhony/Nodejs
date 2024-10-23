import React from 'react';
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import Footer from "../components/Footer";

function Login() {
  return (
    <div className=''>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full fixed-w-1200 flex justify-center"> {/* Outer container with width 1200px */}
          <div className="bg-white shadow-2xl rounded-lg bg-gray-100 p-10 mt-4 mb-4 max-w-[600px] w-full"> {/* Inner login form with max width 600px */}
            <h1 className="text-4xl font-bold mb-8 text-center">Đăng Nhập Tài Khoản</h1>
            <form>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2 text-lg">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Nhập email của bạn" 
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
                  required 
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700 text-lg">Ghi nhớ tôi</span>
                </label>
                <a href="/forget-password" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-500 transition-all duration-300 text-lg"
              >
                Đăng Nhập
              </button>
            </form>
            <p className="mt-6 text-center text-gray-700 text-lg">
              Chưa có tài khoản? <a href="/register" className="text-blue-500 hover:underline">Đăng ký ngay</a>
            </p>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Login;