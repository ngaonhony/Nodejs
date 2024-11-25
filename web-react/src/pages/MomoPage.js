import React, { useState } from 'react'; // import useState
import { Link } from 'react-router-dom';
import Navigator from '../components/Navigator';
import UserBar from '../components/UserBar';


const MomoPage = () => {
  const [amount, setAmount] = useState(50000);

  const NapTien = () => (
    <div className="max-w-lg mx-auto p-4">
      {/* Chọn số tiền cần nạp */}
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Chọn nhanh số tiền cần nạp</h2>
        <div className="grid grid-cols-3 gap-2">
          {[50000, 100000, 200000, 500000, 1000000, 2000000, 5000000].map(
            (value) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  className="hidden"
                  value={value}
                  checked={amount === value}
                  onChange={() => setAmount(value)}
                />
                <div
                  className={`text-center border border-gray-300 rounded-lg p-2 ${amount === value ? "bg-blue-500 text-white" : "bg-white"}`}
                >
                  {value.toLocaleString()} đ
                </div>
              </label>
            )
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            Hoặc nhập số tiền cần nạp
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Thông tin nạp tiền */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Thông tin nạp tiền</h3>
        <div className="flex justify-between">
          <span>Số tiền nạp</span>
          <span>{amount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Khuyến mãi</span>
          <span>0 đ</span>
        </div>
        <div className="flex justify-between mt-2 font-semibold">
          <span>Thực nhận</span>
          <span>{amount.toLocaleString()} đ</span>
        </div>
      </div>

      {/* Nút tiếp tục */}
      <div className="mt-6">
        <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600">
          Tiếp tục →
        </button>
      </div>
    </div>
  );

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
          <nav className="flex" aria-label="Breadcrumb">
            {/* Breadcrumb navigation */}
          </nav>
          <h2 className="text-4xl mt-4 mb-4 w-1100">Đăng tin mới</h2>
          <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md">
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Lưu ý</p>
                <p className="text-sm">
                  <div className="note alert alert-success js-promotion-payment-daily" role="alert">
                    <p>Nạp từ 50.000 đến dưới 1.000.000 tặng 10%</p>
                    <p>Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</p>
                    <p>Nạp từ 2.000.000 trở lên tặng 25%</p>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-[70%] pr-8 ">
              <h1 className="text-2xl font-bold pt-6 mb-4 w-1100">Địa chỉ cho thuê</h1>
              <h3 className="mt-5 mb-3 text-lg font-semibold">Mời bạn chọn phương thức nạp tiền</h3>
              <NapTien />
            </div>
            <div className="w-[30%] pl-8">
              <Link
                className="btn btn-secondary btn-block mb-2 bg-gray-200 text-gray-800 rounded"
                to="/quan-ly/lich-su-nap-tien"
              >
                Lịch sử nạp tiền{' '}
                <i className="inline-block ml-2 fas fa-chevron-right"></i>
              </Link>
              <Link
                className="btn btn-secondary btn-block mb-2 bg-gray-200 text-gray-800 rounded"
                to="/quan-ly/lich-su-thanh-toan"
              >
                Lịch sử thanh toán{' '}
                <i className="inline-block ml-2 fas fa-chevron-right"></i>
              </Link>
              <Link
                className="btn btn-secondary btn-block mb-2 bg-gray-200 text-gray-800 rounded"
                to="/bang-gia-dich-vu"
              >
                Bảng giá dịch vụ{' '}
                <i className="inline-block ml-2 fas fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomoPage;
