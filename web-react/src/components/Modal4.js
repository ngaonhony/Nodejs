import React, { useState } from 'react';

function Modal4({ onClose, onApply }) {
  const [selectedRental, setSelectedRental] = useState('Chọn loại nhà thuê');

  const handleRentalChange = (rental) => {
    setSelectedRental(rental);
  };

  const handleApply = () => {
    onApply(selectedRental); // Gọi hàm onApply với giá trị đã chọn
    onClose(); // Đóng modal sau khi áp dụng
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-lg font-semibold mb-4">Chọn loại nhà thuê</h2>
        <ul>
          {[
            'Tất cả',
            'Nhà thuê Nguyên căn',
            'Cho thuê căn hộ',
            'Cho thuê căn hộ mini',
            'Phòng trọ, nhà trọ',
            'Tìm người ở ghép',
            'Cho thuê mặt bằng',
          ].map((rental) => (
            <li key={rental} className="flex items-center mb-2">
              <input
                type="radio"
                name="rental"
                value={rental}
                checked={selectedRental === rental}
                onChange={() => handleRentalChange(rental)}
                className="mr-2"
              />
              <label
                onClick={() => handleRentalChange(rental)}
                className="cursor-pointer"
              >
                {rental}
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

export default Modal4;
