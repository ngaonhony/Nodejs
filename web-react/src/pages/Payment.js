import Navigator from "../components/Navigator";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBar from "../components/UserBar";
import { fetchServices } from "../slices/serviceSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { createPost } from "../slices/postSlice";
const Payment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { postData } = location.state || JSON.parse(localStorage.getItem('postData'));
  console.log(postData)
  const { services = [] } = useSelector((state) => state.services);
  const userId = useSelector((state) => state.auth.user._id);
  const [selectedDays, setSelectedDays] = useState(3);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("momo");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [timeUnit, setTimeUnit] = useState("day");
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  const handleSelectDays = (e) => {
    setSelectedDays(e.target.value);
  };
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handlePackageSelect = (e) => {
    const selectedPkg = services.find((pkg) => pkg.name === e.target.value);
    setSelectedPackage(selectedPkg);
  };
  const handleTimeUnitChange = (e) => {
    setTimeUnit(e.target.value);
    setSelectedDays(e.target.value === "day" ? 1 : e.target.value === "week" ? 7 : 30);
  };
  const calculateTotalAmount = (pkg, days, unit) => {
    if (!pkg) return 0;
    switch (unit) {
      case "day":
        return pkg.price_per_day * days;
      case "week":
        return pkg.price_per_week * Math.ceil(days / 7);
      case "month":
        return pkg.price_per_month * Math.ceil(days / 30);
      default:
        return 0;
    }
  };
  const generateRandomPaymentId = () => {
    return 'PAY-' + Math.random().toString(36).substr(2, 9);
};
  const handlePayment = async () => {
    const totalAmount = calculateTotalAmount(selectedPackage, selectedDays, timeUnit);
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + selectedDays);
    const post = new FormData();
    const paymentId = generateRandomPaymentId();
    post.append("userId", userId);
    post.append("serviceId", selectedPackage ? selectedPackage._id : null);
    post.append("expiredAt", expirationDate.toISOString());
    post.append("paymentId", paymentId);
    for (const key in postData) {
        if (key !== 'images') {
            post.append(key, postData[key]);
        }
    }
    if (postData && postData.images) {
        postData.images.forEach((image) => {
            post.append("images", image); 
        });
    }
    console.log("Payment Data:", post);
    try {await dispatch(createPost(post));
      if (selectedPaymentMethod === "momo") {
        const response = await axios.post("http://localhost:3000/api/momo/paymentMoMo", { amount: totalAmount, paymentId : paymentId, });
        if (response.data && response.data.payUrl) {
          window.location.href = response.data.payUrl; 
        } else {
          console.error("No payment URL received:", response.data);
        }
      } else if (selectedPaymentMethod === "zalopay") {
        const response = await axios.post("http://localhost:3000/api/zaloPay/payment", {
          amount: totalAmount,
          paymentId: paymentId,
          language: "vn",
        });
        if (response.data && response.data.order_url) {
          window.location.href = response.data.order_url;
        } else {
          console.error("No payment URL received:", response.data);
        }
      } else if (selectedPaymentMethod === "vnpay") {
        const response = await axios.post("http://localhost:3000/api/order/create_payment_url", {
          amount: totalAmount,
          bankCode: "",
          language: "vn",
        });
        if (response.data && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          console.error("No payment URL received:", response.data);
        }
      } else {
        alert("Please select a payment method!");
      }
    } catch (error) {
      console.error("Error during post creation or payment:", error.response ? error.response.data : error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-0 bg-white z-10">
        <Navigator />
      </div>
      <div className="flex">
        <div className="border flex flex-col gap-4 justify-start items-center">
          <div className="w-full sticky top-16 bg-white z-10 shadow-md">
            <UserBar />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[1200px] mx-auto pl-8 pr-8 bg-gray-50 rounded shadow-lg">
          {/* Breadcrumb */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  Trang chủ
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    Quản lý
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-lg font-bold mb-4">Chọn gói tin đăng</h2>

            {/* Gói tin đăng */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn loại tin
                </label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  onChange={handlePackageSelect}
                  defaultValue="">
                  <option value="" disabled>
                    -- Chọn loại tin --
                  </option>
                  {services.map((pkg, index) => (
                    <option key={index} value={pkg.name}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Gói thời gian
                </label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  onChange={handleTimeUnitChange}
                  value={timeUnit}
                  defaultValue="">
                  <option value="">-- Chọn gói thời gian --</option>
                  <option value="day">Đăng theo ngày</option>
                  <option value="week">Đăng theo tuần</option>
                  <option value="month">Đăng theo tháng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Số ngày
                </label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={timeUnit === "month" ? 30 : selectedDays}
                  onChange={timeUnit === "month" ? null : handleSelectDays}
                  disabled={timeUnit === "month"} // Vô hiệu hóa chọn ngày khi chọn tháng
                >
                  {timeUnit === "day" &&
                    [...Array(6).keys()].map((day) => (
                      <option key={day + 1} value={day + 1}>
                        {day + 1} ngày
                      </option>
                    ))}
                  {timeUnit === "week" &&
                    [...Array(23).keys()].map((day) => (
                      <option key={day + 7} value={day + 7}>
                        {day + 7} ngày
                      </option>
                    ))}
                  {timeUnit === "month" && <option value={30}>30 ngày</option>}
                </select>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-bold">Thông tin thanh toán</h3>
              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                <p>
                  Loại tin:{" "}
                  <span className="font-medium">
                    {selectedPackage ? selectedPackage.name : "Chưa chọn"}
                  </span>
                </p>
                <p>
                  Gói thời gian:{" "}
                  <span className="font-medium">Đăng theo ngày</span>
                </p>
                <p>
                  Số ngày:{" "}
                  <span className="font-medium">{selectedDays} ngày</span>
                </p>
                <p>
                  Thành tiền:
                  <span className="font-medium text-red-500">
                    {calculateTotalAmount(
                      selectedPackage,
                      selectedDays,
                      timeUnit
                    ).toLocaleString()}
                    đ
                  </span>
                </p>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <h2 className="text-lg font-bold mb-4">
              Chọn phương thức thanh toán
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  id="momo"
                  value="momo"
                  checked={selectedPaymentMethod === "momo"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="momo">Thanh toán ví MoMo</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  id="credit"
                  value="credit"
                  checked={selectedPaymentMethod === "credit"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="credit">Thanh toán thẻ quốc tế</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  id="bank"
                  value="bank"
                  checked={selectedPaymentMethod === "bank"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="bank">Chuyển khoản ngân hàng</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  id="zalopay"
                  value="zalopay"
                  checked={selectedPaymentMethod === "zalopay"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="momo">Thanh toán ví ZaloPay</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  id="vnpay"
                  value="vnpay"
                  checked={selectedPaymentMethod === "vnpay"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                <label htmlFor="momo">Thanh toán VNPAY</label>
              </div>
            </div>

            {/* Nút Thanh toán */}
            <button
              className="mt-6 w-full bg-orange-500 text-white font-bold py-2 rounded-lg"
              onClick={handlePayment}>
              Thanh toán{" "}
              {calculateTotalAmount(
                selectedPackage,
                selectedDays,
                timeUnit
              ).toLocaleString()}
              đ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
