import React from 'react';
import { ProvinceBtn } from './index'
import { location } from '../ultils/constant'; // Đảm bảo import đúng

const ProvinceItem = ({ image, name }) => {
    return (
        <div className='province-item'>
            <img src={image} alt={name} className='w-full h-auto' />
            <p>{name}</p>
        </div>
    );
};

const Province = () => {
    return (
        <div className='shadow-md rounded-bl-md rounded-br-md'>
            {location.map(item => (
                <ProvinceBtn // Sử dụng component ProvinceItem
                    key={item.id}
                    image={item.image}
                    name={item.name}
                />
            ))}
        </div>
    );
}

export default Province;
