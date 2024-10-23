import React from 'react';
import { ProvinceBtn } from './index'
import { location } from '../ultils/constant'; // Đảm bảo import đúng


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
