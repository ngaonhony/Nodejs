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
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false); // Modal cho chọn giá
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); // Modal cho chọn địa điểm
    const [isRentalModalOpen, setIsRentalModalOpen] = useState(false); // Modal cho chọn loại nhà thuê
    const [selectedAreaRange, setSelectedAreaRange] = useState([30, 50]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10]); // Thêm trạng thái cho giá
    const [selectedLocation, setSelectedLocation] = useState('Tất cả'); // Trạng thái cho địa điểm
    const [selectedRental, setSelectedRental] = useState('Phòng trọ');

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

    const areaText = `Diện tích: ${selectedAreaRange[0]} - ${selectedAreaRange[1]} m²`;
    const priceText = `Giá: ${selectedPriceRange[0]} - ${selectedPriceRange[1]} triệu đồng`;
    const locationText = selectedLocation; // Địa điểm hiện tại
    const rentalText = selectedRental; // Loại nhà thuê hiện tại

    return (
        <div className='flex justify-center'>
            <div className='h-[55px] w-[1100px] p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2'>
                <div onClick={() => setIsRentalModalOpen(true)}> 
                    <SearchItem 
                        IconBefore={<MdOutlineHouseSiding />} 
                        fontWeight 
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                        buttonText={rentalText}
                    />
                </div>
                <div onClick={() => setIsLocationModalOpen(true)}> {/* Mở Modal địa điểm */} 
                    <SearchItem 
                        IconBefore={<HiOutlineLocationMarker />} 
                        buttonText={locationText} // Hiển thị địa điểm đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <div onClick={() => setIsPriceModalOpen(true)}> {/* Mở Modal giá */} 
                    <SearchItem 
                        IconBefore={<TbReportMoney />} 
                        buttonText={priceText} // Hiển thị giá đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <div onClick={() => setIsModalOpen(true)}> {/* Mở Modal diện tích */} 
                    <SearchItem 
                        IconBefore={<RiCrop2Line />} 
                        buttonText={areaText} // Hiển thị diện tích đã chọn
                        IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} 
                    />
                </div>
                <button
    type='button'
    className='outline-none py-2 px-4 w-[240px] bg-[#1266dd] text-sm flex items-center justify-center gap-2 text-white font-medium rounded-lg'
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
