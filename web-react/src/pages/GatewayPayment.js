import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GatewayPayment = () => {
  const [orderUrl, setOrderUrl] = useState(null); // URL thanh toán trả về từ backend
  const [loading, setLoading] = useState(true); // Biến trạng thái để điều khiển trạng thái loading
  const [error, setError] = useState(null); // Biến trạng thái để lưu lỗi nếu có

  // Hàm gọi API để nhận order_url từ backend
  const fetchPaymentDetails = async () => {
    try {
      // Gửi yêu cầu thanh toán đến backend
      const response = await axios.post('http://localhost:3000/payment', {
        // Nếu backend yêu cầu dữ liệu, hãy thay đổi ở đây (ví dụ: thông tin đơn hàng, người dùng...)
        // Ví dụ: 
        // user_id: "user123", amount: 50000, description: "Mua hàng tại Lazada"
      });

      // Kiểm tra phản hồi từ backend
      if (response.data && response.data.order_url) {
        setOrderUrl(response.data.order_url); // Lưu URL thanh toán vào state
      } else {
        setError("Không có order_url trong phản hồi từ ZaloPay");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi gọi API thanh toán:", error);
      setError("Đã xảy ra lỗi khi gửi yêu cầu thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Kết thúc quá trình loading
    }
  };

  // Sử dụng useEffect để tự động gọi API khi component được render
  useEffect(() => {
    fetchPaymentDetails(); // Gọi API khi component được mount
  }, []);

  // Chuyển hướng người dùng đến URL thanh toán sau khi nhận order_url
  useEffect(() => {
    if (orderUrl) {
      // Chuyển hướng đến URL thanh toán của ZaloPay
      window.location.href = orderUrl;
    }
  }, [orderUrl]);

  return (
    <div>
      {loading && <h1>Đang xử lý thanh toán...</h1>} {/* Hiển thị khi đang xử lý */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
      {!loading && !error && <p>Vui lòng đợi trong giây lát...</p>} {/* Nếu không có lỗi và đang tải xong */}
    </div>
  );
};

export default GatewayPayment;
