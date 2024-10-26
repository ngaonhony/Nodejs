import React from 'react';
import icons from '../ultils/icons'


const { IoIosLogOut,MdHistory, MdOutlineContactSupport,IoReceiptOutline,FaDollarSign, CiEdit, MdContactPage, MdPriceCheck } = icons

const UserBar = () => {
  return (
    <div className="max-w-xs p-6 bg-white shadow-md rounded">
      {/* User Info */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-300"></div>
        <h2 className="text-lg font-semibold mt-2">Khang</h2>
        <p className="text-gray-600">0332817948</p>
        <p className="text-gray-800">Mã thành viên: <span className="font-semibold">145867</span></p>
        <p className="text-gray-800">TK Chính: <span className="font-semibold">0</span></p>
        {/* Buttons */}
        <div className="flex justify-center mt-4">
          <button className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600">Nạp tiền</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Đăng tin</button>
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-yellow-100 p-4 rounded mb-6 text-center">
        <p className="font-semibold">Nhân viên hỗ trợ riêng của bạn:</p>
        <p>Thanh Ly - LBKCorp</p>
        <p className="text-red-600">0909316890</p>
      </div>

      {/* Menu */}
      <ul className="space-y-4">
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<MdContactPage/>} </i> Quản lý tin đăng
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {< CiEdit/>}</i> Sửa thông tin cá nhân
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<FaDollarSign/>} </i> Nạp tiền vào tài khoản
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<MdHistory/>} </i> Lịch sử nạp tiền
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<IoReceiptOutline/>} </i> Lịch sử thanh toán
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<MdPriceCheck/>} </i> Bảng giá dịch vụ
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2">{<MdOutlineContactSupport/>}</i> Liên hệ
        </li>
        <li className="flex items-center text-gray-800 hover:text-black cursor-pointer">
          <i className="material-icons mr-2"> {<IoIosLogOut/>} </i> Thoát
        </li>
      </ul>
    </div>
  );
};

export default UserBar;