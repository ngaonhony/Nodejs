import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Navigator from './Navigator';
import Search from './Search';
import { text } from '../../ultils/constant';  
import { ProvinceBtn, Itemsidebar } from '../../components/'; 
import { location } from '../../ultils/constant';
import { List } from './index' 
import Footer from './Footer';

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center h-full border '>
            <Header />
            <Navigator />
            <div className='max-w-1100 flex flex-col items-center justify-start mt-3'>
                <Outlet />
            </div>
            <div className='border  w-980 flex flex-col gap-3'>
                <Search />
                <div>
                    <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                    <p className='text-sm text-gray-700'>{text.HOME_DECSCRIPTION}</p> 
                </div>
                <div className='max-w-1100 flex items-center gap-5 justify-center py-5 shadow-md'> {/* Sửa justify */}
                    {location.map(item => {
                        return (
                            <ProvinceBtn 
                                key={item.id}
                                image={item.image}
                                name={item.name}
                            />
                        );
                    })}
                </div>       
                <div className='w-[1100px] flex justify-center items-center '>
                    <div className='flex w-full w-[70%] '>
                    <List />
                    </div>
                <div className='w-[30%] border flex flex-col gap-4 justify-start items-center'>
                    <Itemsidebar />
                   
                </div>
                </div>
               
            </div>
            <div className='w-screen'>
                    <Footer />
                </div>
        </div>
    );
};

export default Home;
