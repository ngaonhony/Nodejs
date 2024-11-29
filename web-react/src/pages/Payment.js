import Navigator from "../components/Navigator";
import React, { useEffect, useState } from "react";
import UserBar from "../components/UserBar";
import { Link } from "react-router-dom";


const Payment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVipFilter, setSelectedVipFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("publish");
  const [isVipDropdownOpen, setVipDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(3);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("momo");
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(10000); // Dùng state để lưu giá trị gói tin đã chọn

  const packages = [
    { name: "Tin VIP 3", price: 10000 },
    { name: "Tin VIP 2", price: 20000 },
    { name: "Tin VIP 1", price: 50000 },
  ];

  // Xử lý khi người dùng chọn số ngày
  const handleSelectDays = (e) => {
    setSelectedDays(e.target.value);
  };

  // Xử lý khi người dùng thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Xử lý khi người dùng chọn gói tin
  const handlePackageSelect = (e) => {
    const selectedPackage = packages.find(pkg => pkg.name === e.target.value);
    if (selectedPackage) {
      setSelectedPackagePrice(selectedPackage.price);
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
                <label className="block text-sm font-medium mb-2">Gói thời gian</label>
                <select className="border border-gray-300 rounded-lg p-2 w-full">
                  <option value="ngay">Đăng theo ngày</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Chọn loại tin</label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  onChange={handlePackageSelect}
                >
                  {packages.map((pkg, index) => (
                    <option key={index} value={pkg.name}>
                      {pkg.name} ({pkg.price.toLocaleString()}đ/ngày)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Số ngày</label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedDays}
                  onChange={handleSelectDays}
                >
                  {[...Array(60).keys()].map((day) => (
                    <option key={day + 1} value={day + 1}>
                      {day + 1} ngày
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-bold">Thông tin thanh toán</h3>
              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                <p>Loại tin: <span className="font-medium">{packages.find(pkg => pkg.price === selectedPackagePrice)?.name}</span></p>
                <p>Gói thời gian: <span className="font-medium">Đăng theo ngày</span></p>
                <p>Số ngày VIP: <span className="font-medium">{selectedDays} ngày</span></p>
                <p>Thành tiền: <span className="font-medium text-red-500">{(selectedPackagePrice * selectedDays).toLocaleString()}đ</span></p>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <h2 className="text-lg font-bold mb-4">Chọn phương thức thanh toán</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  id="momo" 
                  value="momo"
                  checked={selectedPaymentMethod === 'momo'} 
                  onChange={handlePaymentMethodChange}
                  className="mr-2" />
                <label htmlFor="momo">Thanh toán ví MoMo</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  id="credit" 
                  value="credit" 
                  checked={selectedPaymentMethod === 'credit'} 
                  onChange={handlePaymentMethodChange}
                  className="mr-2" />
                <label htmlFor="credit">Thanh toán thẻ quốc tế</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  id="bank" 
                  value="bank" 
                  checked={selectedPaymentMethod === 'bank'} 
                  onChange={handlePaymentMethodChange}
                  className="mr-2" />
                <label htmlFor="bank">Chuyển khoản ngân hàng</label>
              </div>

              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  id="zalopay" 
                  value="zalopay"
                  checked={selectedPaymentMethod === 'zalopay'} 
                  onChange={handlePaymentMethodChange}
                  className="mr-2" />
                <label htmlFor="momo">Thanh toán ví ZaloPay</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  id="vnpay" 
                  value="vnpay"
                  checked={selectedPaymentMethod === 'vnpay'} 
                  onChange={handlePaymentMethodChange}
                  className="mr-2" />
                <label htmlFor="momo">Thanh toán VNPAY</label>
              </div>
            </div>

            {/* Nút Thanh toán */}
            <Link to="/management/gatewaypayment">
      <button className="mt-6 w-full bg-orange-500 text-white font-bold py-2 rounded-lg">
        Thanh toán {(selectedPackagePrice * selectedDays).toLocaleString()}đ
      </button>
    </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
