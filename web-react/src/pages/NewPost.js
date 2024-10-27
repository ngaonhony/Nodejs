import Header from "../components/Header";
import Navigator from "../components/Navigator";
import React, { useState } from "react";
import UserBar from "../components/UserBar";

const NewPost = () => {
  const [formData, setFormData] = useState({
    address: "",
    title: "",
    description: "",
    price: "",
    images: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // handle form submission
  };

  return (
    <div className='w-[1100px] flex flex-col'>
      <Header />
      <Navigator />
      <div className='flex w-full mt-4'> {/* Flex container for UserBar and Form */}
        <div className='w-[30%] border flex flex-col gap-4 justify-start items-center'>
          <UserBar />
        </div>
        <div className='w-[70%] flex flex-col items-center'>
          <div className="w-full p-8 bg-gray-50 rounded shadow-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6">Đăng tin mới</h2>

              {/* Address Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Địa chỉ cho thuê:
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              {/* Title Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Tiêu đề:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Nhập tiêu đề"
                />
              </div>

              {/* Description Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Mô tả:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  rows="4"
                  placeholder="Mô tả chi tiết"
                />
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Giá thuê:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Nhập giá thuê"
                />
              </div>

              {/* Image Upload Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Hình ảnh:</label>
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded mt-1"
                  accept="image/*"
                />
              </div>

              {/* Video Upload Section */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Video:</label>
                <input
                  type="file"
                  name="video"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded mt-1"
                  accept="video/*"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded mt-4 hover:bg-green-700"
              >
                Tạo tin đăng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
