import Navigator from "../components/Navigator";
import React, { useEffect, useState } from "react";
import UserBar from "../components/UserBar";
import { Link } from "react-router-dom";
const posts = [];
const ManagePostsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVipFilter, setSelectedVipFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("publish");
  const [isVipDropdownOpen, setVipDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const toggleVipDropdown = () => {
    setVipDropdownOpen(!isVipDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!isStatusDropdownOpen);
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
          <h2 className="text-4xl mt-4 mb-4 w-1100">Quản lý tin đăng</h2>
          <div className="flex items-center space-x-2 ml-auto mt-2 md:mt-0">
        {/* Tìm kiếm theo mã tin hoặc tiêu đề */}
        <form className="flex">
          <input
            type="text"
            name="s"
            className="py-1 px-2 border border-gray-400 rounded"
            placeholder="Tìm theo mã tin hoặc tiêu đề"
            style={{ width: '200px' }}
          />
        </form>

        {/* Lọc theo loại VIP */}
        <div className="relative inline-block">
          <button
            onClick={toggleVipDropdown}
            className="btn btn-outline-secondary dropdown-toggle bg-white border border-gray-400 rounded py-1 px-2 text-sm"
            type="button"
            aria-haspopup="true"
            aria-expanded={isVipDropdownOpen}
          >
            Lọc theo loại VIP
          </button>
          {isVipDropdownOpen && (
            <div className="absolute right-0 z-10 bg-white border border-gray-300 shadow-lg mt-1 rounded">
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=all&package=vip50">Tin Hot</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=all&package=vip30">Tin VIP 30</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=all&package=vip20">Tin VIP 20</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=all&package=vip10">Tin VIP 10</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=all&package=normal">Tin thường</Link>
            </div>
          )}
        </div>

        {/* Lọc theo trạng thái */}
        <div className="relative inline-block">
          <button
            onClick={toggleStatusDropdown}
            className="btn btn-outline-secondary dropdown-toggle bg-white border border-gray-400 rounded py-1 px-2 text-sm"
            type="button"
            aria-haspopup="true"
            aria-expanded={isStatusDropdownOpen}
          >
            Lọc theo trạng thái
          </button>
          {isStatusDropdownOpen && (
            <div className="absolute right-0 z-10 bg-white border border-gray-300 shadow-lg mt-1 rounded">
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=publish&package=all">Tin đang hiển thị</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=expired&package=all">Tin hết hạn</Link>
              <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to="/quan-ly/tin-dang?status=hidden&package=all">Tin đang ẩn</Link>
            </div>
          )}
        </div>

        {/* Nút Đăng tin mới */}
        <Link className="btn btn-danger text-white bg-red-600 rounded py-1 px-2 hidden md:block" to="/management/new-post">
          Đăng tin mới
        </Link>
      </div>
          <div className="container mx-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Mã tin</th>
                  <th className="px-4 py-2">Ảnh đại diện</th>
                  <th className="px-4 py-2">Tiêu đề</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Ngày bắt đầu</th>
                  <th className="px-4 py-2">Ngày hết hạn</th>
                  <th className="px-4 py-2">Trang thái</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="flex justify-center items-center">
                        Bạn chưa có tin đăng nào
                        <Link
                          to="/management/new-post"
                          className="ml-2 text-blue-500 underline">
                          Bấm vào đây
                        </Link>
                        <span className="mx-1">để</span> bắt đầu đăng tin.
                      </div>
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-20 object-cover"
                          />
                        )}
                      </td>
                      <td>{post.title}</td>
                      <td>{post.price}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{post.startDate}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{post.endDate}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{post.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePostsPage;
