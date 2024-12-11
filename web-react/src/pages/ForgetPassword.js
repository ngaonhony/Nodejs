import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword,resetPassword } from "../slices/authSlice"; // Adjust path as necessary
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showResetForm, setShowResetForm] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await dispatch(forgotPassword(email)).unwrap();
      setSuccess(response.message); // Assuming the response contains a success message
      setShowResetForm(true); // Show the reset form
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Call resetPassword function with verification code and new password
      const response = await dispatch(resetPassword({ verificationCode, password: newPassword })).unwrap();
      setSuccess(response.message); // Handle successful reset
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="">
      <div className="w-full flex flex-col items-center h-full border">
        <Header />
      </div>
      <Navigator />
      <div className="bg-gray-100 font-sans leading-normal tracking-normal flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-4 mb-4 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Quên Mật Khẩu</h1>
          {!showResetForm ? (
            // Forgot Password Form
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="forgot-email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="forgot-email"
                  className="w-full p-2 border rounded"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
              >
                Gửi Liên Kết Đặt Lại Mật Khẩu
              </button>
              <p className="mt-6 text-center text-gray-700">
                Quay lại <Link to="/login" className="text-blue-500 hover:underline">Đăng Nhập</Link>
              </p>
            </form>
          ) : (
            // Reset Password Form
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="verification-code" className="block text-gray-700 mb-2">Mã Xác Thực</label>
                <input
                  type="text"
                  id="verification-code"
                  className="w-full p-2 border rounded"
                  placeholder="Nhập mã xác thực"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-gray-700 mb-2">Mật Khẩu Mới</label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full p-2 border rounded"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
              >
                Đặt Lại Mật Khẩu
              </button>
              <p className="mt-6 text-center text-gray-700">
                Quay lại <Link to="/login" className="text-blue-500 hover:underline">Đăng Nhập</Link>
              </p>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;