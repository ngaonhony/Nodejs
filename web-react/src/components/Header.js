import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/images/logo.png';
import Button from './Button';
import icons from '../ultils/icons';

const { AiOutlinePlusCircle } = icons;

const Header = () => {
    return (
        <div className='fixed-header w-1100 flex items-center justify-between'>
            <Link to="/" className='flex items-center'>
                <img
                    src={logo}
                    alt="logo"
                    className='w-[240px] h-[70px] object-contain'
                />
            </Link>
            <div className='flex items-center gap-1'>
                <Button 
                    text={'đăng nhập'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    path="/login"  
                />
                <Button 
                    text={'đăng ký'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    path="/register" 
                />
                <Button 
                    text={'đăng tin mới'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    IcAfter={AiOutlinePlusCircle} 
                    path="/management/new-post" 
                />
            </div>
        </div>
    );
};

export default Header;