import React, { useEffect } from 'react';
import {Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slices/categorySlice';

const Navigator = ({ categoryId }) => {
    const dispatch = useDispatch();
    const { categories = [] } = useSelector(state => state.categories || {});
    const state = useSelector((state) => state);
    console.log(state)
    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);

    const notActive = 'hover:bg-[#fb173d] px-4 h-full flex items-center';
    const active = 'hover:bg-[#fb173d] px-4 h-full flex items-center bg-[#fb173d]';

    return (
        <div className='w-screen flex justify-center items-center h-[50px] bg-[#3961fb] text-white'>
            <div className='max-w-1100 flex items-center gap-5 text-sm font-medium'>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} className='h-[50px] flex justify-center items-center'>
                            <Link 
                                to={`/category/${category._id}`} 
                            >
                                {category.name}
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>No categories available</div>
                )}

                <div className='h-[50px] flex justify-center items-center'>
                    <Link 
                        to='/service-page' 
                        className={({ isActive }) => isActive ? active : notActive}
                    >
                        Bảng giá dịch vụ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navigator;