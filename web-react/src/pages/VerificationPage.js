import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import { verifyCode, resendVerificationCode } from '../services/authService';

function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Get email from location state

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResend = async () => {
    try {
      const response = await resendVerificationCode(email); // Call the resend function
      setSuccessMessage(response.message); // Show success message
    } catch (err) {
      setError(err.message); // Show error message
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await verifyCode(email, verificationCode); // Pass email with verification code
      setSuccessMessage(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message); // Show the error message
    }
  };

  return (
    <div>
      <Header />
      <Navigator />
      <div className="flex flex-col items-center bg-gray-100 font-sans leading-normal tracking-normal">
        <div className="bg-white shadow-2xl rounded-lg p-10 mt-4 mb-4 max-w-[600px] w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Xác Thực Tài Khoản</h1>
          <p className="text-gray-700 text-center mb-4">
            Vui lòng nhập mã xác thực đã gửi đến email của bạn: <strong>{email}</strong>
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          <form onSubmit={handleVerify}>
            <div className="mb-6">
              <label htmlFor="verificationCode" className="block text-gray-700 mb-2">
                Mã Xác Thực
              </label>
              <input
                type="text"
                id="verificationCode"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mã xác thực"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-500 transition-all duration-300">
              Xác Thực
            </button>
          </form>
          <p className="mt-6 text-center text-gray-700">
            Nếu bạn không nhận được email, hãy kiểm tra thư mục spam hoặc <button onClick={handleResend} className="text-blue-600 hover:underline">
      Gửi lại mã xác thực
    </button>
          </p>
          <Link to="/login" className="text-blue-600 hover:underline mt-4 block text-center">
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Verification;