import React, { useEffect, useState } from "react";
import Navigator from "../components/Navigator";
import UserBar from "../components/UserBar";
import { Link } from "react-router-dom";
import { fetchPostsAndPayments } from "../slices/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

const PaymentHistoryPage = () => {
  const dispatch = useDispatch();
  const { postsAndPayments, loading, error } = useSelector(
    (state) => state.payments
  );

  useEffect(() => {
    dispatch(fetchPostsAndPayments());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-0 bg-white z-10">
        <Navigator />
      </div>
      <div className="flex ">
        <div className="border flex flex-col gap-4 justify-start items-center">
          <div className="w-full sticky top-16 bg-white z-10 shadow-md">
            <UserBar />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[1200px] mx-auto pl-8 pr-8 bg-gray-50 rounded shadow-lg">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Lịch sử thanh toán tin
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-4xl mt-4 mb-4">Lịch sử thanh toán tin</h2>
          <div className="container mx-auto mt-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label for="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="pr-3 py-3">
                        STT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Mã tin đăng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Loại tin
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Loại hoạt động
                      </th>

                      
                      <th scope="col" className="px-6 py-3">
                        Phí
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thời gian
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Còn lại
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {postsAndPayments.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
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
                      postsAndPayments.map((item, index) => (
                        <tr
                          key={item.post._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <label for="checkbox-table-1" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="pr-3 py-4">
                          {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            {item.post?.paymentId ?? "Không có"}
                          </td>
                          <td
                            className="px-6 py-4 text-base"
                            style={{
                              color:
                                item.post.serviceId?.title_color || "#000000",
                            }}>
                            {item.post?.serviceId?.name ?? "Không có"}
                          </td>

                          <td className="px-6 py-4">
                            {item.payment?.paymentMethod ??
                              "Không có"}
                          </td>

                          <td className="px-6 py-4">
                            {item.payment?.amount ?? "Không có"}
                          </td>
                          
                          <td className="px-6 py-4">
                            {item.post?.createdAt
                              ? new Date(
                                  item.post.createdAt
                                ).toLocaleDateString()
                              : "Không có"}
                          </td>
                          <td className="px-6 py-4">
                            {item.post?.expiredAt
                              ? new Date(
                                  item.post.expiredAt
                                ).toLocaleDateString()
                              : "Không có"}
                          </td>
                          <td className="px-6 py-4">
                            {item.payment?.status === "success" ? (
                              <span className="text-green-500">
                                {item.payment.status}
                              </span> // Màu xanh cho thành công
                            ) : item.payment?.status === "failure" ? (
                              <span className="text-red-500">
                                {item.payment.status}
                              </span> // Màu đỏ cho thất bại
                            ) : (
                              "Không có"
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
