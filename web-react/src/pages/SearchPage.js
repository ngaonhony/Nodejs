import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import Navigator from '../components/Navigator';
import Search from './Search';
import { text } from '../ultils/constant';  
import { ProvinceBtn, ItemSidebar } from '../components/'; 
import { location } from '../ultils/constant';
import { List } from './index'; 

const SearchPage = () => {
    const resultsFound = false; // Thay đổi giá trị này tùy vào kết quả tìm kiếm thực tế

    return (
        <div className='w-full flex flex-col items-center h-full border '>
            <Header />
            <Navigator />
            <div className='max-w-1100 flex flex-col items-center justify-start mt-3'>
                <Outlet />
            </div>
            <div className='border  w-980 flex flex-col gap-3'>
                <Search />
                <div className='mt-4'> {/* Khoảng trống giữa Search và thông báo */}
                    {!resultsFound && (
                        <p className='text-center text-gray-500'>Không tìm thấy kết quả</p>
                    )}
                </div>
                <div>
                    <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                    <p className='text-sm text-gray-700'>{text.HOME_DECSCRIPTION}</p> 
                </div>
                <div className='max-w-1100 flex items-center gap-5 justify-center py-5 shadow-md'>
                    {location.map(item => (
                        <ProvinceBtn 
                            key={item.id}
                            image={item.image}
                            name={item.name}
                        />
                    ))}
                </div>       
                <div className='w-[1100px] flex justify-center items-center '>
                    <div className='flex w-full w-[70%]'>
                        <List />
                    </div>
                    <div className='w-[30%] border flex flex-col gap-4 justify-start items-center'>
                        <ItemSidebar />
                    </div>
                </div>
                <div className='w-[1100px] flex justify-center items-center '></div>
            </div>
            <div className='w-screen'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchPage;
