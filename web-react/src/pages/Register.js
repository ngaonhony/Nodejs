import React from "react";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
function Register() {
  return (
    <div className=''>
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="flex flex-col h-screen items-center bg-gray-100 font-sans leading-normal tracking-normal">
        <div className="bg-white shadow-2xl rounded-lg p-10 mt-4 mb-4 max-w-[600px] w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Đăng Ký Tài Khoản
          </h1>
          <form>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Tên Đăng Nhập
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên đăng nhập"
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
