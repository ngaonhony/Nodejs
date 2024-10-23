import React, { useState } from 'react';
import anhphong1 from "../assets/images/anhphong1.png";
import anhphong2 from "../assets/images/anhphong2.png";
import anhphong3 from "../assets/images/anhphong3.png";
import anhphong4 from "../assets/images/anhphong4.png";
import anhphong5 from "../assets/images/phong5.png";

const SlideShow = () => {
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
    <div className="flex   
 w-full h-500px items-center justify-center space-x-4 bg-black p-4">
      <button
        className="bg-yellow-300 p-2 rounded-lg hover:bg-gray-400"
        onClick={handlePrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6   
 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div   
 className="w-[500px] h-[500px] overflow-hidden rounded-lg">
        <img
          src={images[currentImageIndex]}
          alt="Nội dung chuyển ảnh"
          className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>

      <button
        className="bg-yellow-300 p-2 rounded-lg hover:bg-gray-400"
        onClick={handleNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6   
 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>   

  );
};

export default SlideShow;