import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
    const defaultAvatar = 'https://phongtro123.com/images/default-user.png'; // Thay thế bằng URL ảnh mặc định của bạn
    if (!user) {
        return null; // Hoặc có thể trả về một thông báo hoặc hình ảnh mặc định
      }
    return (
      <div className="flex flex-col w-full h-full">
        <div className="flex p-4 pb-3 px-3 ">
          <div className="flex-shrink-0">
            <img
              className="avatar size-10"
              src={defaultAvatar||"https://phongtro123.com/images/default-user.png"} // Sử dụng ảnh mặc định nếu không có avatar
              alt={user.name || 'Không xác định'} 
              loading="lazy"
            />
          </div>
        <div className="flex-grow-1 ms-2 ps-1">
          <span className="font-medium line-clamp-1">{user.name}</span>
          <span className="block text-sm">{user.phone}</span>
        </div>
      </div>
      <div className="p-3 pt-0 w-full">
        <div className="flex justify-between bg-yellow-100 text-gray-800 p-2 small rounded border border-yellow-200">
          <div>
            <p className="m-0 text-sm">Số dư tài khoản</p>
            <p className="m-0 text-lg font-bold">{user.balance.toLocaleString()} đ</p>
          </div>
          <div>
            <Link
              className="btn btn-sm bg-yellow-500 text-white flex justify-center items-center rounded-full"
              to="/nap-tien" // Thay đổi đường dẫn theo nhu cầu
            >
              <i className="icon window-plus me-1"></i>
              Nạp tiền
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;