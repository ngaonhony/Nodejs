import React from 'react';
import logo from '../../assets/logo.png';
import { Button } from '../../components';
import icons from '../../ultils/icons';

const { AiOutlinePlusCircle } = icons;

const Header = () => {
    return (
        <div className='w-1100 flex items-center justify-between'>
            <img
                src={logo}
                alt="logo"
                className='w-[240px] h-[70px] object-contain'
            />
            <div className='flex items-center gap-1'>
                <small>Phongtronhom1.com xin chào!</small>
                <Button 
                    text={'đăng nhập'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    link="/login" // Thêm đường dẫn đến trang đăng nhập
                />
                <Button 
                    text={'đăng ký'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    link="/register" // Thêm đường dẫn đến trang đăng ký (nếu cần)
                />
                <Button 
                    text={'đăng tin mới'} 
                    textColor='text-white' 
                    bgColor='bg-[#8717fb]' 
                    IcAfter={AiOutlinePlusCircle} 
                    link="/new-post" // Thêm đường dẫn đến trang đăng tin mới (nếu cần)
                />
            </div>
        </div>
    );
};

export default Header;
