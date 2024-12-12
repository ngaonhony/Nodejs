import Navigator from "../components/Navigator";
import UserBar from "../components/UserBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slices/authSlice"; // Adjust import path accordingly
import { Link } from "react-router-dom";
const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const defaultImage = "https://phongtro123.com/images/default-user.png";
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone); 
    }
  }, [user]);
  const [updateStatus, setUpdateStatus] = useState(null); // null: chưa cập nhật, 'success': cập nhật thành công, 'error': cập nhật thất bại
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, phone };
  console.log(name, phone)
    try {
      if (user && user._id) {
        setUpdateStatus(null); // Reset trạng thái cập nhật
        await dispatch(updateUserProfile({ id: user._id, userData }));
        setUpdateStatus('success'); // Cập nhật trạng thái thành công
      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setUpdateStatus('error'); // Cập nhật trạng thái thất bại
    }
  };
  const handleChangePassword = () => {
    setShowPasswordInputs(!showPasswordInputs); 
  };
  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-0 bg-white z-10">
        <Navigator />
      </div>
      <div className="flex ">
        <div className="border flex flex-col gap-4 justify-start items-center">
          <div className="w-full sticky top-16 bg-white z-10 ">
            <UserBar />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[1200px] mx-auto pl-8 pr-8 bg-gray-50 rounded">
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
              <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Trang chủ
                </Link>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    Quản lý
                  </Link>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Danh sách tin đăng
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-4xl mt-4 mb-4 w-1100">
            Cập nhật thông tin cá nhân
          </h2>
          {updateStatus === 'success' && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
      Cập nhật thông tin thành công!
    </div>
  )}
  {updateStatus === 'error' && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.
    </div>
  )}
        <form onSubmit={handleSubmit} className="js-form-submit-data ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="user_email"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_phone"
                className="col-span-1 md:col-span-1 col-form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="user_phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={phone} // Bind phone state
                onChange={(e) => setPhone(e.target.value)} // Handle phone input
                disable
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900">
                Tên hiển thị
              </label>
              <input
                type="text"
                id="user_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <div className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-sm text-blue-600 mt-2">
              <Link to="#">Đổi mật khẩu</Link>
              </div>
            </div>

            {/* {showPasswordInputs && (
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    htmlFor="current_password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label
                    htmlFor="new_password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )} */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_avatar"
                className="col-span-1 md:col-span-1 col-form-label">
                Ảnh đại diện
              </label>
              <div className="col-span-1 md:col-span-2">
                <div className="user-avatar-upload-wrapper js-one-image-wrapper">
                  <div className="user-avatar-inner js-one-image-inner">
                    <div
                      className="user-avatar-preview js-one-image-preview rounded-full"
                      style={{
                        background: `url(${defaultImage}) center no-repeat`,
                        backgroundSize: "cover",
                        height: "150px",
                        width: "150px",
                      }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="flex justify-center col-span-1 md:col-span-2">
                <button type="submit" className="btn btn-primary w-1/2 py-2 bg-blue-600 text-white rounded-lg">
                  Lưu & Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;