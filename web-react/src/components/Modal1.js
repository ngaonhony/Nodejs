import React, { useState } from 'react';

function Modal1({ onClose, onApply }) {
  const [selectedRange, setSelectedRange] = useState([30, 50]);

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedRange([value, value + 20]); // Điều chỉnh phạm vi dựa trên giá trị
  };

  const applySelection = () => {
    onApply(selectedRange); // Gọi hàm onApply với giá trị đã chọn
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Chọn Diện Tích</h2>
        
        <input
          type="range"
          min="0"
          max="90"
          step="10"
          value={selectedRange[0]}
          onChange={handleRangeChange}
          className="w-full mb-4"
        />
        
        <div className="text-gray-700 mb-4">
          Diện tích: {selectedRange[0]} - {selectedRange[1]} m²
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button onClick={() => setSelectedRange([0, 20])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Dưới 20m²</button>
          <button onClick={() => setSelectedRange([20, 30])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 20m² - 30m²</button>
          <button onClick={() => setSelectedRange([30, 50])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 30m² - 50m²</button>
          <button onClick={() => setSelectedRange([50, 70])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 50m² - 70m²</button>
          <button onClick={() => setSelectedRange([70, 90])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Từ 70m² - 90m²</button>
          <button onClick={() => setSelectedRange([90, 100])} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Trên 90m²</button>
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

export default Modal1;
