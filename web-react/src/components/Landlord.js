import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const Landlord = ({ user, posts }) => {
  const filteredPosts = posts
    ? posts.filter((p) => String(p.userId._id) === String(user._id))
    : 1;
  const postCount = filteredPosts.length;
  const createdAtFormatted = format(new Date(user.createdAt), "dd/MM/yyyy");
  return (
    <div>
      <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2">
        <img
          src={
            user.avatar ||
            "https://www.bing.com/th?id=OIP.Fogk0Q6C7GEQEdVyrbV9MwHaHa&w=206&h=206&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          } // Đường dẫn ảnh mặc định nếu không có ảnh
          alt="Avatar"
          className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2"
        />
      </div>
      <h2 className="text-2xl my-2 text-black">{user.name || "Chưa có tên"}</h2>
      {filteredPosts.length > 0 && (
        <div>
          <p className="text-green-500 mb-5">Số bài viết: {postCount}</p>
          <p>Ngày gia nhập: {createdAtFormatted}</p>
        </div>
      )}
      <button className="bg-green-500 text-white py-2 px-4 rounded-md text-lg cursor-pointer mb-2 w-full">
        {user.phone}
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg cursor-pointer mb-2 w-full flex justify-center items-center">
        <img
          src="https://cdn.freelogovectors.net/wp-content/uploads/2020/10/zalo-logo.png"
          alt="Zalo"
          className="w-5 mr-2"
        />
        <Link
          to={`https://zalo.me/${user.phone}`}
          target="_blank"
          rel="noopener noreferrer">
          Nhắn Zalo
        </Link>
      </button>
    </div>
  );
};

export default Landlord;
