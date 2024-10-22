import React, { useState } from 'react';
import anhphong1 from "../assets/images/anhphong1.png";
import anhphong2 from "../assets/images/anhphong2.png";
import anhphong3 from "../assets/images/anhphong3.png";
import anhphong4 from "../assets/images/anhphong4.png";
import anhphong5 from "../assets/images/phong5.png";

const Slideshow = () => {
  const images = [
    anhphong1,
    anhphong2,
    anhphong3,
    anhphong4,
    anhphong5,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex w-full h-500px items-center justify-center space-x-4 bg-black p-4">
      {/* Nút Previous */}
      <button 
        className="bg-yellow-300 p-2 rounded-lg hover:bg-gray-400" 
        onClick={handlePrev}
      >
        Trước
      </button>

      {/* Hiển thị ảnh */}
      <div className="w-[500px] h-[500px] overflow-hidden rounded-lg">
        <img 
          src={images[currentImageIndex]} 
          alt="Nội dung chuyển ảnh" 
          className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110" 
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>

      {/* Nút Next */}
      <button 
        className="bg-yellow-300 p-2 rounded-lg hover:bg-gray-400" 
        onClick={handleNext}
      >
        Tiếp theo
      </button>
    </div>
  );
};

export default Slideshow;
