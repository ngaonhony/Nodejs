import React, { memo } from 'react'
import icons from '../ultils/icons'

const { GrNext } = icons
const ItemSidebar = () => {
    return (
<div className='p-4 rounded-md bg-white w-full'>
    <h3 className='text-lg font-semibold'>Danh sách cho thuê</h3>
    <div className='flex flex-col gap-1 items-start'>
        <div className='flex items-center'>
            <GrNext size={10} color='#ccc' />
            <p className='hover:text-red-500'>Cho thuê căn hộ</p>
        </div>
        <div className='flex items-center'>
            <GrNext size={10} color='#ccc' />
            <p className='hover:text-red-500'>Cho thuê phòng trọ</p>
        </div>
        <div className='flex items-center'>
            <GrNext size={10} color='#ccc' />
            <p className='hover:text-red-500'>Tìm phòng trọ ghép</p>
        </div>
        <div className='flex items-center'>
            <GrNext size={10} color='#ccc' />
            <p className='hover:text-red-500'>Cho thuê nhà nguyên căn</p>
        </div>
        <div className='flex items-center'>
            <GrNext size={10} color='#ccc' />
            <p className='hover:text-red-500'>Cho thuê mặt bằng</p>
        </div>
    </div>
</div>

    )
}

export default memo(ItemSidebar)