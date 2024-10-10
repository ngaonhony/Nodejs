import React from 'react';

const Button = ({ text, textColor, bgColor, IcAfter }) => {
  return (
    <button 
      type='button'
      className={`py-2 px-4 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`  }
    >
      {text}
      {IcAfter && <IcAfter />}
    </button>
  );
}

export default Button
