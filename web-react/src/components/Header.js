import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import Button from "./Button";
import { logout } from "../slices/authSlice";
import icons from "../ultils/icons";
import User from "./User";

const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleNewPostClick = () => {
    if (user) {
      navigate("/management/new-post");
    } else {
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed-header w-1100 flex items-center justify-between bg-white shadow-md">
      <Link
        to="/"
        className="flex items-center"
      >
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>

      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            <div className="relative inline-block text-left">
              <button
                className="text-white bg-[#3961fb] px-4 py-2 rounded-md hover:bg-[#2951d8] transition"
                onClick={toggleDropdown}>
                Quản lý tài khoản
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-4">
                  <div className="py-1">
                    <Link
                      to="/management/manage-post-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Quản lý tin đăng
                    </Link>
                    <Link
                      to="/management/update-profile-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sửa thông tin cá nhân
                    </Link>
                    <Link
                      to="/management/recharge-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Nạp tiền vào tài khoản
                    </Link>
                    <Link
                      to="/management/recharge-history-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Lịch sử nạp tiền
                    </Link>
                    <Link
                      to="/management/payment-history-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Lịch sử thanh toán
                    </Link>
                    <Link
                      to="/service-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Bảng giá dịch vụ
                    </Link>
                    <Link
                      to="/feedback-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Liên hệ
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}>
                      Thoát
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <button
                onClick={toggleProfileDropdown}
                type="button"
                className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2">
                  <img
                    className="w-full h-full rounded-full"
                    src="/images/default_user.svg"
                    alt="User Avatar"
                  />
                </div>
                <span className="flex items-center">
                  {user ? user.name : "Tài khoản"}
                </span>
                {/* Mũi tên xuống */}
                <span className="text-xl">
                  &#9662; {/* Ký tự Unicode cho mũi tên xuống */}
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <User user={user} />{" "}
                      {/* Sử dụng component User để hiển thị thông tin */}
                    </div>
                    <p className="mb-3 text-sm font-normal">
                      <Link to="#" className="hover:underline">
                        @{user ? user.username : "jeseleos"}{" "}
                        {/* Hiển thị tên người dùng */}
                      </Link>
                    </p>
                    <p className="mb-4 text-sm">
                      Open-source contributor. Building{" "}
                      <Link to="#" className="text-blue-600 hover:underline">
                        flowbite.com
                      </Link>
                      .
                    </p>
                    <ul className="flex text-sm">
                      <li className="mr-2">
                        <Link to="#" className="hover:underline">
                          <span className="font-semibold">
                            {user ? user.followingCount : "0"}
                          </span>
                          <span> Following</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="hover:underline">
                          <span className="font-semibold">
                            {user ? user.followersCount : "0"}
                          </span>
                          <span> Followers</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            
          </>
        ) : (
          <>
            <Button
              text={"Đăng nhập"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              path="/login"
            />
            <Button
              text={"Đăng ký"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              path="/register"
            />
           
          </>
        )}
         <button
              className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
              onClick={handleNewPostClick}>
              <AiOutlinePlusCircle className="inline-block mr-2" />
              Đăng tin mới
            </button>
      </div>
    </div>
  );
};

export default Header;
