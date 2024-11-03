import React, { useState } from 'react';

function Modal3({ onClose, onApply }) {
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleApply = () => {
    onApply(selectedLocation); // Gọi hàm onApply với giá trị đã chọn
    onClose(); // Đóng modal sau khi áp dụng
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-lg font-semibold mb-4">TOÀN QUỐC</h2>
        <ul>
          {[
            'Tất cả',
            'Phường Uyên Hưng',
            'Xã Hội Nghĩa',
            'Xã Khánh Bình',
            'Xã Tân Hiệp',
            'Xã Tân Vĩnh Hiệp',
            'Xã Vĩnh Tân',
          ].map((location) => (
            <li key={location} className="flex items-center mb-2">
              <input
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={() => handleLocationChange(location)}
                className="mr-2"
              />
              <label
                onClick={() => handleLocationChange(location)}
                className="cursor-pointer"
              >
                {location}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleApply} // Gọi hàm áp dụng khi nhấn nút
            className="w-full mr-2 py-2 bg-green-500 text-white rounded-lg"
          >
            Áp dụng
          </button>
          <button
            onClick={onClose}
            className="w-full ml-2 py-2 bg-blue-600 text-white rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal3;
