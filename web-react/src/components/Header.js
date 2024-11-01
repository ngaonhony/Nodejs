import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/images/logo.png';
import Button from './Button';
import icons from '../ultils/icons';

const { AiOutlinePlusCircle } = icons;

const Header = () => {
    const [user, setUser] = useState(null); // State to manage user info
    const [token, setToken] = useState(localStorage.getItem('token')); // Get token from local storage

    useEffect(() => {
        if (token) {
            // Assuming you have a function to decode the token and get user info
            const userData = decodeToken(token); // Replace with your decoding logic
            setUser(userData);
        }
    }, [token]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

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
                {user ? (
                    <>
                        <span className="text-white mr-4">Xin chào, {user.name}</span>
                        <Button 
                            text={'Quản lý tài khoản'} 
                            textColor='text-white' 
                            bgColor='bg-[#3961fb]' 
                            path="/account-management" 
                        />
                        <Button 
                            text={'Đăng xuất'} 
                            textColor='text-white' 
                            bgColor='bg-red-600' 
                            onClick={handleLogout} 
                        />
                    </>
                ) : (
                    <>
                        <Button 
                            text={'Đăng nhập'} 
                            textColor='text-white' 
                            bgColor='bg-[#3961fb]' 
                            path="/login"  
                        />
                        <Button 
                            text={'Đăng ký'} 
                            textColor='text-white' 
                            bgColor='bg-[#3961fb]' 
                            path="/register" 
                        />
                    </>
                )}
                <Button 
                    text={'Đăng tin mới'} 
                    textColor='text-white' 
                    bgColor='bg-[#3961fb]' 
                    IcAfter={AiOutlinePlusCircle} 
                    path="/management/new-post" 
                />
            </div>
        </div>
    );
};

// Helper function to decode token (assuming JWT)
const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
        return { name: payload.name }; // Return user info (adjust as needed)
    } catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
};

export default Header;