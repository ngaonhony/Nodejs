import React from 'react';
import { Link } from 'react-router-dom';
import Navigator from '../components/Navigator';
import UserBar from '../components/UserBar';
import bankTransfer from '../assets/images/bank-transfer.png';
import paymentMethod from '../assets/images/payment-method.svg';
import creditCard from '../assets/images/credit-card.png';
import momo from '../assets/images/momo.png';
import zalopay from '../assets/images/zalopay.png';
import shoppeePay from '../assets/images/shopeepay2.svg';
import onlineStore from '../assets/images/online-store.svg';
import qrCode from '../assets/images/qr-code.png';
import vnpay from '../assets/images/vnpay.png'
const RechargePage = () => {
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
<svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
<h1 className="text-2xl font-bold pt-6 mb-4 w-1100">
Địa chỉ cho thuê
</h1>
<h3 className="mt-5 mb-3 text-lg font-semibold">
Mời bạn chọn phương thức nạp tiền
</h3>
              <div className="hidden md:block">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      href: '/quan-ly/nap-tien/chuyen-khoan',
                      imgSrc: bankTransfer,
                      title: 'Chuyển khoản',
                    },
                    {
                      href: '/quan-ly/nap-tien/atm-internet-banking',
                      imgSrc: paymentMethod,
                      title: 'Thẻ ATM Internet Banking',
                    },
                    {
                      href: '/quan-ly/nap-tien/vnpay',
                      imgSrc: vnpay,
                      title: 'VN PAY',
                    },
                    {
                      href: '/management/recharge-page/momo',
                      imgSrc: momo,
                      title: 'MOMO',
                    },
                    {
                      href: '/quan-ly/nap-tien/zalopay',
                      imgSrc: zalopay,
                      title: 'ZaloPay',
                    },
                    {
                      href: '/quan-ly/nap-tien/shopeepay',
                      imgSrc: shoppeePay,
                      title: 'ShopeePay',
                    },
                    {
                      href: '/quan-ly/nap-tien/cua-hang-tien-loi',
                      imgSrc: onlineStore,
                      title: 'Điểm giao dịch, cửa hàng tiện lợi',
                    },
                    {
                      href: '/quan-ly/nap-tien/qr-code',
                      imgSrc: qrCode,
                      title: 'Quét mã QRCode',
                    },
                  ].map((method, index) => (
                    <div
                      key={index}
                      className="method_item border rounded-lg p-4"
                    >
                      <Link to={method.href} className="flex items-center">
                        <img
                          src={method.imgSrc}
                          alt={method.title}
                          className="w-12 h-12 mr-2"
                        />
                        <div className="method_item_name flex-grow">
                          {method.title}
                        </div>
                        <button className="btn btn_select_method bg-blue-500 text-white rounded px-3 py-1">
                          Chọn
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[30%] flex flex-col">
              <div className="list-group-item flex items-center p-3 border-b">
                <div className="font-semibold">Số dư tài khoản</div>
                <h3 className="heading text-lg text-green-600">
                  <strong>0đ</strong>
                </h3>
              </div>
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

export default RechargePage;