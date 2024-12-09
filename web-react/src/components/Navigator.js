import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slices/categorySlice';

const Navigator = () => {
    const dispatch = useDispatch();
    const { categories = [] } = useSelector(state => state.categories || {});
    const location = useLocation();
    const state = useSelector((state) => state);
    console.log(state)
    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);

    const notActive = 'hover:bg-[#fb173d] flex-grow h-full flex items-center justify-center transition-colors duration-300';
    const active = 'bg-[#fb173d] flex-grow h-full flex items-center justify-center';

    return (
        <div className='w-screen flex justify-center items-center h-[50px] bg-[#3961fb] text-white'>
            <div className='max-w-1100 flex items-center justify-center gap-5 text-sm font-medium w-full'>
            <div className='h-[50px] flex justify-center items-center'>
                    <Link 
                        to='/' 
                        className={({ isActive }) => isActive ? active : notActive}
                    >
                        Trang chủ
                    </Link>
                </div>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} className='h-[50px] flex justify-center items-center'>
                            <Link 
                                to={`/category/${category._id}`}
                                className={`${location.pathname === `/category/${category._id}` ? active : notActive}`}
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