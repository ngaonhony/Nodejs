import React, { useState } from 'react';
import { SearchItem } from '../components';
import icons from '../ultils/icons';
import Modal1 from '../components/Modal1';
import Modal2 from '../components/Modal2'; 
import Modal3 from '../components/Modal3'; 
import Modal4 from '../components/Modal4';
import { Link } from 'react-router-dom';


const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons;

const Search = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false); 
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); 
    const [isRentalModalOpen, setIsRentalModalOpen] = useState(false); 
    const [ setSelectedAreaRange] = useState([30, 50]);
    const [ setSelectedPriceRange] = useState([0, 10]);
    const [ setSelectedLocation] = useState('Tất cả'); 
    const [ setSelectedRental] = useState('Phòng trọ');

    const handleApplyArea = (range) => {
        setSelectedAreaRange(range);
        setIsModalOpen(false);
    };

    const handleApplyPrice = (range) => {
        setSelectedPriceRange(range); // Lưu giá trị khi áp dụng giá
        setIsPriceModalOpen(false); // Đóng modal giá sau khi áp dụng
    };

    const handleApplyLocation = (location) => {
        setSelectedLocation(location); // Lưu địa điểm khi áp dụng
        setIsLocationModalOpen(false); // Đóng modal địa điểm
    };

    const handleApplyRental = (rental) => {
        setSelectedRental(rental); // Lưu loại nhà thuê khi áp dụng
        setIsRentalModalOpen(false); // Đóng modal loại nhà thuê
    };

    const areaText = `Diện tích`;
    const priceText = `Giá`;
    const locationText = 'Địa điểm'; // Địa điểm hiện tại
    const rentalText = 'Vị trí'; // Loại nhà thuê hiện tại

    return (
        <div className='flex justify-center'>
            <div className='h-[55px] p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2'>
                <div onClick={() => setIsRentalModalOpen(true)}> 
                    <SearchItem 
                        IconBefore={<MdOutlineHouseSiding />} 
                        fontWeight 
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                        buttonText={rentalText}
                    />
                </div>
                <div onClick={() => setIsLocationModalOpen(true)}> 
                    <SearchItem 
                        IconBefore={<HiOutlineLocationMarker />} 
                        buttonText={locationText} // Hiển thị địa điểm đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <div onClick={() => setIsPriceModalOpen(true)}> 
                    <SearchItem 
                        IconBefore={<TbReportMoney />} 
                        buttonText={priceText} // Hiển thị giá đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <div onClick={() => setIsModalOpen(true)}>  
                    <SearchItem 
                        IconBefore={<RiCrop2Line />} 
                        buttonText={areaText} // Hiển thị diện tích đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <button
    type='button'
    className='outline-none py-2 px-4 bg-[#1266dd] text-sm flex items-center justify-center gap-2 text-white font-medium rounded-lg'
>
    <Link to="/search-page" className="flex items-center w-full h-full"> {/* Link bao bọc nút */}
        <FiSearch />
        Tìm kiếm
    </Link>
</button>

            </div>
            {isModalOpen && (
                <Modal1 onClose={() => setIsModalOpen(false)} onApply={handleApplyArea} /> 
            )}
            {isPriceModalOpen && (
                <Modal2 onClose={() => setIsPriceModalOpen(false)} onApply={handleApplyPrice} /> 
            )}
            {isLocationModalOpen && (
                <Modal3 onClose={() => setIsLocationModalOpen(false)} onApply={handleApplyLocation} /> 
            )}
            {isRentalModalOpen && (
                <Modal4 onClose={() => setIsRentalModalOpen(false)} onApply={handleApplyRental} /> 
            )} {/* Modal4 cho chọn loại nhà thuê */}
        </div>
    );
}

export default Search;
