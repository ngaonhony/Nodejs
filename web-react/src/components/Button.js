import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, textColor, bgColor, IcAfter, path }) => {
  return (
    <Link 
      to={path} // Sử dụng path thay vì link
      className={`py-2 px-4 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {text}
      {IcAfter && <IcAfter />}
      </Link>

  );
}

export default Button;

