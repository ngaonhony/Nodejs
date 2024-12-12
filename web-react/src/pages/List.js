  import React, { memo, useEffect, useState } from "react";
  import { Button } from "../components";
  import { useSelector, useDispatch } from "react-redux";
  import { getPosts } from "../slices/postSlice"; // Import the getPosts action
  import { Link, useLocation } from "react-router-dom";

  const List = ({ categoryId }) => {
    const dispatch = useDispatch();
    const { posts, error } = useSelector((state) => state.posts);
    const location = useLocation();
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
    if (!posts) {
      return <p className="text-gray-500">Loading posts...</p>;
    }
    let filteredPosts = posts.filter((post) => {
      const isActive = post.serviceId && post.status === "active";
      const isNotExpired = new Date(post.expiredAt) > new Date(); // Kiểm tra ngày hết hạn
      return isActive && isNotExpired;
    });
    const currentCategoryId =categoryId || new URLSearchParams(location.search).get("categoryId");
    if (currentCategoryId) {
      filteredPosts = posts.filter(
        (post) => post.categoryId._id === currentCategoryId
      );
    }
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const ratingA = a.serviceId?.rating || 0;
      const ratingB = b.serviceId?.rating || 0;
      return ratingB - ratingA; 
    });
    const handlePostClick = (postId) => {
      setSelectedPostId(postId);
    };
    if (error) {
      return <p className="text-red-500">{error.message}</p>;
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="w-full p-2 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-between my-3">
          <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
          <span>Cập nhật: 12:05 25/08/2022</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Sắp xếp:</span>
          <Button bgColor="bg-gray-200" text="Mặc định" />
          <Button bgColor="bg-gray-200" text="Mới nhất" />
          <Button bgColor="bg-gray-200" text="Có video" />
        </div>
        <div className="items">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div
                key={post.id}
                className="w-full flex border-t border-orange-600 p-4">
                <div className="w-2/5 flex flex-wrap gap-[2px] items-center">
                  <img
                    src={post.images}
                    alt="preview"
                    className="w-[90%] h-48 block object-cover max-w-full rounded-md"
                  />
                </div>
                <div className="w-3/5">
                  <div className="flex justify-between gap-4 w-full">
                    <div className="flex text-red-600 font-medium">
                      <span className="text-yellow-500">
                        {"★".repeat(post.serviceId?.rating || 0)}
                      </span>
                      <Link
                        to={`/detail-page/${post._id}`}
                        style={{
                          color: post.serviceId?.title_color || "#000000",
                        }} 
                        className="ml-2 hover:text-red-500 transition-colors duration-300"
                        onClick={() => handlePostClick(post._id)}>
                        {post.title}
                      </Link>
                    </div>
                  </div>
                  <div className="my-2 flex items-center justify-between gap-[2px]">
                    <span className="font-bold text-green-600">
                      {post.price} triệu/tháng
                    </span>
                    <span>{post.area} mét vuông</span>
                  </div>
                  <span>{post.location}</span>
                  <p className="text-gray-500 h-12 line-clamp-3 overflow-hidden">
                    {post.description}
                  </p>
                  <div className="flex items-center mt-3 justify-between">
                    <div className="flex items-center">
                      <img
                        src={post.userAvatarUrl ||"https://phongtro123.com/images/default-user.png"}
                        alt="avatar"
                        loading="lazy"
                        className="w-[30px] h-[30px] object-cover rounded-full"
                      />
                      <p>{post.userId ? post.userId.name : "Unknown User"}</p>
                    </div>
                    {post.serviceId?.rating === 5 && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="bg-blue-700 text-white p-1 rounded-md">
                          Gọi {post.userId?.phone || "Unknown"}
                        </button>
                        <Link
                          to={`https://zalo.me/${post.userId?.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 p-1 rounded-md border border-blue-700 text-center flex items-center justify-center">
                          Nhắn Zalo
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex border-t border-orange-600 p-4 justify-center items-center">
              <p className="text-center text-gray-500">
                Không có tin đăng nào trong danh mục này. Hãy thử chọn danh mục
                khác!
              </p>
            </div>
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default memo(List);
