import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa"; // Import your desired icon
import Button from "../components/Button";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const RoomListing = ({ post }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address] = useState(post.location); // Địa chỉ từ post
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
              style={{ color: post.serviceId?.title_color || "#000000" }} // Default to black if title_color is not set
              className="ml-2 hover:text-red-500 transition-colors duration-300">
              {post.title}
            </Link>
          </div>
        </h2>
        <p className="text-2xl text-green-600 font-bold">
          {post.price} triệu/tháng
        </p>
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
        <p>{post.description}</p>
      </div>
      {/* Map */}
      <div className="mt-5">
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={
              location.lat ? location : { lat: 10.762622, lng: 106.660172 }
            }
            defaultZoom={14}
            center={
              location.lat ? location : { lat: 10.762622, lng: 106.660172 }
            }>
            {location.lat && (
              <AnyReactComponent
                lat={location.lat}
                lng={location.lng}
                text="Marker"
              />
            )}
          </GoogleMapReact>
        </div>
      </div>
      <div className="mt-5">
        <Button
          text="Gửi phản hồi"
          textColor="text-white"
          bgColor="bg-[#3961fb]"
          IcAfter={FaCommentDots}
          path="/feedback-page"
        />
      </div>
    </div>
  );
};
export default RoomListing;
