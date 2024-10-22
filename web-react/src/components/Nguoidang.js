import React from 'react';

function Nguoidang() {
  return (
    <div className="w-72 m-5 p-5 rounded-lg bg-yellow-400 text-center font-sans">
      <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2"></div>
      <h2 className="text-2xl my-2 text-black">Chị Giang</h2>
      <p className="text-green-500 mb-5">Đang hoạt động</p>
      <button className="bg-green-500 text-white py-2 px-4 rounded-md text-lg cursor-pointer mb-2 w-full">
        0328837249
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg cursor-pointer mb-2 w-full flex justify-center items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zalo_logo_%282021%29.svg/1200px-Zalo_logo_%282021%29.svg.png"
          alt="Zalo"
          className="w-5 mr-2"
        />
        Nhắn Zalo
      </button>
      <button className="bg-white text-black py-2 px-4 border border-black rounded-md text-lg cursor-pointer w-full">
        Yêu thích
      </button>
    </div>
  );
}

export default Nguoidang;
