import React from 'react'
import { Searchitem} from '../components'
import icons from '../ultils/icons'

const {BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons

const Search = () => {
    return (
        <div className='flex justify-center'>
        <div className='h-[55px] w-[1100px] p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2'>
             <Searchitem IconBefore={< MdOutlineHouseSiding/>} fontWeight IconAfter={<BsChevronRight color='rgd(156, 163, 175)'/>}text='Phòng trọ, nhà trọ'/>
             <Searchitem IconBefore={< HiOutlineLocationMarker/>} IconAfter={<BsChevronRight color='rgd(156, 163, 175)'/>} text='Toàn quốc'/>
             <Searchitem IconBefore={< TbReportMoney/>} IconAfter={<BsChevronRight color='rgd(156, 163, 175)'/>} text='Chọn giá'/>
             <Searchitem IconBefore={< RiCrop2Line/>} IconAfter={<BsChevronRight color='rgd(156, 163, 175)'/>} text='Chọn diện tích'/>
             <button
                type='button'
                className='outline-none py-2 px-4 w-full bg-[#1266dd] text-sm flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
             </button>
            </div>
            </div> 
    )
}

export default Search