import React from 'react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className='shadow-md rounded-bl-md text-blue-700 rounded-br-md cursor-pointer hover:text-orange-600'>
            <img
            src={ image}
            alt={ name}
            className='w-[215px] h-[110px] object-cover rounded-tl-md  rounded-tr-md'
            />
            <div className='font-medium p-2 text-center'>{name}</div>
            </div>
    )
}

export default  ProvinceBtn;