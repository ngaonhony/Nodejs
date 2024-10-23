import React from "react";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  return (
    <div className="">
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="bg-gray-100 font-sans leading-normal tracking-normal flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 mt-4 mb-4 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Quên Mật Khẩu</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="forgot-email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="forgot-email"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                    >
                        Gửi Liên Kết Đặt Lại Mật Khẩu
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-700">
                    Quay lại <a href="login.html" className="text-blue-500 hover:underline">Đăng Nhập</a>
                </p>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
