import React from 'react';

const RoomListing = () => {
  return (
    <div className="font-sans max-w-2xl mx-auto p-5 border border-gray-300 bg-white">
      {/* Title and Price */}
      <div className="border-b border-gray-300 pb-2 mb-5">
        <h2 className="text-orange-500 text-xl">⭐ Phòng trọ dạng căn hộ mini cao cấp tại 796 Lê Đức Thọ, P.15, Quận Gò Vấp</h2>
        <p className="text-2xl text-green-600 font-bold">3 triệu/tháng</p>
      </div>

      {/* Location */}
      <div className="mt-5">
        <p><strong>Địa chỉ:</strong> 796 Đường Lê Đức Thọ, Phường 15, Quận Gò Vấp, Hồ Chí Minh</p>
        <p><strong>Diện tích:</strong> 30m²</p>
        <p><strong>Đăng lúc:</strong> 11 giờ trước</p>
        <p><strong>Mã tin:</strong> 277830</p>
      </div>

      {/* Listing Details */}
      <div className="mt-5">
        <h3 className="text-gray-800 border-b border-gray-300 pb-1">Thông tin mô tả</h3>
        <p>Cho thuê căn hộ mini cao cấp tại 796 Lê Đức Thọ, Phường 15, Quận Gò Vấp, Tp. Hồ Chí Minh.</p>
        <p>Diện tích 30m², giá 3 triệu/tháng.</p>
        <p>Full nội thất: tủ, điều hòa, chăn máy, giường, bếp đầy đủ và 24/24.</p>
        <p>Wifi miễn phí, máy nước nóng lạnh.</p>
      </div>

      {/* Contact Info */}
      <div className="mt-5">
        <h3 className="text-gray-800 border-b border-gray-300 pb-1">Thông tin liên hệ</h3>
        <p><strong>Liên hệ:</strong> Chị Giang</p>
        <p><strong>Điện thoại:</strong> 0328837249</p>
        <p><strong>Zalo:</strong> 0328837249</p>
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
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default RoomListing;
