import React, { useState } from "react";
import { useSelector } from "react-redux";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";

const { FiSearch } = icons;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { posts } = useSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Đếm số lượng bài viết hiển thị

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    if (input) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredPosts(filtered);
      setVisibleCount(5); 
    } else {
      setFilteredPosts([]);
      setVisibleCount(5);
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5); 
  };

  return (
    <div className="flex justify-center my-4">
      <div className="relative max-w-[1000px] p-2 bg-[#febb02] rounded-lg flex items-center shadow-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Tìm kiếm bài viết..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
          style={{ width:"1000px",height: "40px", backgroundColor: '#fff' }}
        />
        <Link to="/search-page">
          <button
            type="button"
            className="ml-2 py-2 px-4 bg-[#1266dd] text-sm flex items-center justify-center gap-2 text-white font-medium rounded-lg hover:bg-[#0f5bb5] transition duration-300">
            <FiSearch />
          </button>
        </Link>
      </div>
      {filteredPosts.length > 0 && (
        <div className="absolute bg-white shadow-lg mt-2 rounded-lg w-full z-50 max-w-[1000px]" style={{ marginTop: "50px" }}>
          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div key={post._id} className="flex p-2 hover:bg-gray-100">
              <div className="flex flex-wrap gap-[2px] items-center">
                <img
                  src={post.images}
                  alt="preview"
                  className="w-20 h-20 block object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between gap-4 w-full">
                <div className="flex text-red-600 font-medium">
                  <span className="text-yellow-500">
                    {"★".repeat(post.serviceId?.rating || 0)}
                  </span>
                  <Link
                    to={`/detail-page/${post._id}`}
                    style={{
                      color: post.serviceId?.title_color || "#000000", // Màu mặc định là đen
                    }}
                    className="ml-2 hover:text-red-500 transition-colors duration-300">
                    {post.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {visibleCount < filteredPosts.length && ( // Hiển thị nút "Xem thêm" nếu còn bài viết
            <button
              onClick={handleShowMore}
              className="w-full py-2 bg-[#1266dd] text-white font-medium rounded-lg hover:bg-[#0f5bb5] transition duration-300">
              Xem thêm
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;