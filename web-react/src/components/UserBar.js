import React from 'react';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import Button from './Button';
const { 
  IoIosLogOut, 
  MdHistory, 
  MdOutlineContactSupport, 
  IoReceiptOutline, 
  FaDollarSign, 
  CiEdit, 
  MdContactPage, 
  MdPriceCheck 
} = icons;

const mockUserData = {
  name: "Khang",
  phone: "0332817948",
  memberCode: "145867",
  accountBalance: 0,
  supportStaff: {
    name: "Thanh Ly - LBKCorp",
    phone: "0909316890",
  },
};

const UserBar = () => {
  return (
    <div className="max-w-xs pl-6 pr-6 pb-4 mb-4 bg-white shadow-md rounded">
      {/* User Info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
          <div className="text-center ml-4">
            <h2 className="text-lg font-semibold">{mockUserData.name}</h2>
            <p className="text-gray-600">{mockUserData.phone}</p>
          </div>
        </div>
        <p className="text-gray-800">Mã thành viên: <span className="font-semibold">{mockUserData.memberCode}</span></p>
        <p className="text-gray-800">TK Chính: <span className="font-semibold">{mockUserData.accountBalance}</span></p>
        
        {/* Buttons */}
        <div className="flex justify-center mt-4">
          <button className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600">Nạp tiền</button>
          <Button 
          text={'Đăng tin mới'} 
          textColor='text-white' 
          bgColor='bg-red-500' 
          path="/management/new-post" 
        />
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-yellow-100 p-2 rounded mb-6 text-center">
        <p className="font-semibold">Nhân viên hỗ trợ riêng của bạn:</p>
        <p>{mockUserData.supportStaff.name}</p>
        <p className="text-red-600">{mockUserData.supportStaff.phone}</p>
      </div>

      {/* Menu */}
      <ul className="space-y-4">
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/management/manage-post-page" className="flex items-center">
            <i className="material-icons mr-2">{<MdContactPage />}</i> Quản lý tin đăng
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/management/update-profile-page" className="flex items-center">
            <i className="material-icons mr-2">{<CiEdit />}</i> Sửa thông tin cá nhân
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/management/recharge-page" className="flex items-center">
            <i className="material-icons mr-2">{<FaDollarSign />}</i> Nạp tiền vào tài khoản
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/management/recharge-history-page" className="flex items-center">
            <i className="material-icons mr-2">{<MdHistory />}</i> Lịch sử nạp tiền
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/management/payment-history-page" className="flex items-center">
            <i className="material-icons mr-2">{<IoReceiptOutline />}</i> Lịch sử thanh toán
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to='/service-page' className="flex items-center">
            <i className="material-icons mr-2">{<MdPriceCheck />}</i> Bảng giá dịch vụ
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to='/feedback-page' className="flex items-center">
            <i className="material-icons mr-2">{<MdOutlineContactSupport />}</i> Liên hệ
          </Link>
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <Link to="/thoat" className="flex items-center">
            <i className="material-icons mr-2">{<IoIosLogOut />}</i> Thoát
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserBar;