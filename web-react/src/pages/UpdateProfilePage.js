import { Link } from "react-router-dom";
import Navigator from "../components/Navigator";
import UserBar from "../components/UserBar";
import React, { useState, useRef } from "react";

const UpdateProfilePage = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const defaultImage = "https://phongtro123.com/images/default-user.png";
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    const imageUrl = null;
      setImage(imageUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Xóa giá trị của input file
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-0 bg-white z-10">
        <Navigator />
      </div>
      <div className="flex ">
        <div className="border flex flex-col gap-4 justify-start items-center">
          <div className="w-full sticky top-16 bg-white z-10 shadow-md">
            {" "}
            <UserBar />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[1200px] mx-auto pl-8 pr-8 bg-gray-50 rounded shadow-lg">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
          <form className="js-form-submit-data " action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_id"
                className="col-span-1 md:col-span-1 col-form-label">
                Mã thành viên
              </label>
              <input
                type="text"
                readOnly
                className=" border bg-gray-300 border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                id="user_id"
                value="#145936"
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
                readOnly
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                id="user_phone"
                value="0964425306"
                disabled
              />
              <div className="text-sm text-blue-600 mt-2">
                <Link to="#">Đổi số điện thoại</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_name"
                className="block mb-2 text-sm font-medium text-gray-900">
                Tên hiển thị
              </label>
              <input
                type="text"
                id="user_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder="Ex: Nguyễn Văn A"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="user_email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder="name@flowbite.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <label
                htmlFor="user_zalo"
                className="block mb-2 text-sm font-medium text-gray-900">
                Số Zalo
              </label>
              <input
                type="tel"
                id="user_phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                defaultValue="0964425306"
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
                        background: image
                          ? `url(${image}) center no-repeat`
                          : `url(${defaultImage}) center no-repeat`,
                        backgroundSize: "cover",
                        height: "150px",
                        width: "150px",
                      }}></div>
                  </div>
                  <div className="mt-2">
                    {image && (
                      <div className="text-sm text-blue-600 mt-2">
                        <button
                          type="button"
                          className="bg-gray-100 remove-image js-remove-one-image text-red-500 mb-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={handleRemoveImage}>
                          Xóa hình này
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="bg-gray-100 btn-add-avatar js-change-image-file py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="flex justify-center col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="btn btn-primary w-1/2 py-2 bg-blue-600 text-white rounded-lg">
                  Lưu & Cập nhật
                </button>
              </div>
            </div>
            <input type="hidden" name="user_id" value="145936" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
