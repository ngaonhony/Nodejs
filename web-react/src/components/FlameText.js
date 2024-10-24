import React from 'react';
import '../assets/css/FlameText.css'; // Đảm bảo bạn tạo file CSS này

const FlameText = ({ text }) => {
  return (
    <span className="flame-text">
      {text}
    </span>
  );
};

export default FlameText;