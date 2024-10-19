import React from 'react';

const Button = ({ text, textColor, bgColor, IcAfter, link }) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`py-2 px-4 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {text}
      {IcAfter && <IcAfter />}
    </a>
  );
}

export default Button;

