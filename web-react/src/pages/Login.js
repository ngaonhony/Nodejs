import React from 'react';
import Header from '../components/Header';
import Navigator from './Navigator';


function Login() {
  return (
    <div className='w-full flex flex-col items-center h-full border '>
    <Header />
    <Navigator />
    import React from 'react';

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <i className="fab fa-facebook mr-2"></i>
            Đăng nhập bằng tài khoản Facebook
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <i className="fab fa-google mr-2"></i>
            Đăng nhập bằng tài khoản Google
          </button>
        </div>

        <div className="my-4 text-center">
          <span className="text-gray-500">Hoặc</span>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full"
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ghi nhớ mật khẩu
            </label>
            <a href="https://example.com" className="text-blue-600">Quên mật khẩu ?</a>
          </div>
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-500">Chưa có tài khoản?</p>
          <button className="text-blue-600 mt-2">Đăng ký tài khoản</button>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Login;