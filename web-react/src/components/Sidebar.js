import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slices/categorySlice'; // Import action từ categorySlice
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
const { GrNext } = icons;

const Sidebar = () => {
    const dispatch = useDispatch();
    const { categories = []} = useSelector(state => state.categories || {});

    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);
    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold'>Danh sách cho thuê</h3>
            <div className='flex flex-col gap-1 items-start'>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Link
              key={category._id}
              to={`/category/${category._id}`}
              className="flex items-center hover:text-red-500"
            >
              <GrNext size={10} color="#ccc" />
              <p>{category.name}</p>
            </Link>
                    ))
                ) : (
                    <p>Không có danh mục nào</p>
                )}
            </div>
        </div>
    );
};

export default memo(Sidebar);