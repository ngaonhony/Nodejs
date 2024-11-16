import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slices/categorySlice';

const Navigator = () => {
    const dispatch = useDispatch();

    const { categories = [] } = useSelector(state => state.categories || {});

    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchCategories()); 
        };

        fetchData();
    }, [dispatch]);

    const notActive = 'hover:bg-[#fb173d] px-4 h-full flex items-center';
    const active = 'hover:bg-[#fb173d] px-4 h-full flex items-center bg-[#fb173d]';

    return (
        <div className='w-screen flex justify-center items-center h-[50px] bg-[#3961fb] text-white'>
            <div className='max-w-1100 flex items-center gap-5 text-sm font-medium'>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} className='h-[50px] flex justify-center items-center'>
                            <NavLink 
                                to={`/category/${category._id}`} 
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {category.name}
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <div>No categories available</div>
                )}

                <div className='h-[50px] flex justify-center items-center'>
                    <NavLink 
                        to='/service-page' 
                        className={({ isActive }) => isActive ? active : notActive}
                    >
                        Bảng giá dịch vụ
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navigator;