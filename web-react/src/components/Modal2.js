import React, { useState } from 'react';

function Modal2({ onClose, onApply }) {
  const [selectedRange, setSelectedRange] = useState([0, 10]); // Bắt đầu từ 0-10 triệu

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedRange([value, Math.min(value + 10, 10)]); // Điều chỉnh phạm vi giá, tối đa 10 triệu
  };

  const applySelection = () => {
    onApply(selectedRange); // Gọi hàm onApply với giá trị đã chọn
    onClose(); // Đóng modal sau khi áp dụng
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Chọn Giá</h2>
        
        <input
          type="range"
          min="0"
          max="10" // Thay đổi max thành 10 triệu
          step="1" // Bước nhảy 1 triệu
          value={selectedRange[0]}
          onChange={handleRangeChange}
          className="w-full mb-4"
        />
        
        <div className="text-gray-700 mb-4">
          Giá: {selectedRange[0]} - {selectedRange[1]} triệu đồng
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button onClick={() => setSelectedRange([0, 1])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Dưới 1 triệu đồng</button>
          <button onClick={() => setSelectedRange([1, 2])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 1 - 2 triệu đồng</button>
          <button onClick={() => setSelectedRange([2, 3])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 2 - 3 triệu đồng</button>
          <button onClick={() => setSelectedRange([3, 5])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 3 - 5 triệu đồng</button>
          <button onClick={() => setSelectedRange([5, 7])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 5 - 7 triệu đồng</button>
          <button onClick={() => setSelectedRange([7, 10])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 7 - 10 triệu đồng</button>
          <button onClick={() => setSelectedRange([10, 10])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Trên 10 triệu đồng</button>
        </div>
        
        <button 
          onClick={applySelection} 
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Áp dụng
        </button>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 mt-2"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default Modal2;
