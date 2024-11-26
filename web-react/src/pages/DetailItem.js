import React from "react";
import { Link } from "react-router-dom";
const RoomListing = ({ post }) => {
  return (
    <div className="font-sans w-full mx-auto p-5 border-gray-300 bg-white">
      <div className="border-b border-gray-300 pb-2 mb-5">
        <h2 className="text-orange-500 text-xl">
          <div className="flex text-red-600 font-medium">
        <span className="text-yellow-500">
          {"★".repeat(post.serviceId?.rating || 0)}
        </span>
        <Link
          to={`/detail-page/${post._id}`}
          style={{ color: post.serviceId?.title_color || '#000000' }} // Default to black if title_color is not set
          className="ml-2 hover:text-red-500 transition-colors duration-300"
        >
          {post.title}
        </Link>
      </div>
        </h2>
        <p className="text-2xl text-green-600 font-bold">{post.price} triệu/tháng</p>
      </div>

      {/* Location */}
      <div className="mt-5">
        <p>
          <strong>Địa chỉ:</strong> {post.location}
        </p>
        <p>
          <strong>Diện tích:</strong> {post.area}m²
        </p>
        <p>
          <strong>Đăng lúc:</strong> createdAtFormatted
        </p>
      </div>

      {/* Listing Details */}
      <div className="mt-5">
        <h3 className="text-gray-800 border-b border-gray-300 pb-1">
          Thông tin mô tả
        </h3>
        <p>
        {post.description}
        </p>
      </div>
      {/* Map */}
      <div className="mt-5">
        <h3 className="text-gray-800 border-b border-gray-300 pb-1">Bản đồ</h3>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5962821447777!2d106.65003107579785!3d10.844622058892602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a5a0b41f03%3A0xc16d6bd5b3a10cf0!2zNzk2IMSQLiBMw6ogxJDhu6ljIFRow7osIFBoxrDhu51uZyAxNSwgUXXhuq1uIEfDsiBW4bqhLCBIw7ogQ2jDrSBNaW5o!5e0!3m2!1sen!2s!4v1697527932812!5m2!1sen!2s"
          width="100%"
          height="300"
          className="border-none"
          allowFullScreen=""
          loading="lazy"></iframe>
      </div>
      <Link className="btn btn-report btn-outline" to="/feedback-page">
        <i></i> Gửi phản hồi
      </Link>
    </div>
  );
};
export default RoomListing;
