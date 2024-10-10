import React from 'react'
import logo from '../../assets/logo.png'
import { Button} from '../../components'
import icons from '../../ultils/icons'

const { AiOutlinePlusCircle} = icons

const Header = () => {
    return (
        <div className= 'w-1100 flex items-center justify-between'>
             < img
             src= {logo}
             alt="logo"
             className='w-[240px] h-[70px] object-contain'
           />
            <div className= 'flex items-center gap-1'>
                <small>Phongtronhom1.com xin chào!</small>
                <Button text= {'đăng nhập'} textColor= 'text-white' bgColor= 'bg-[#3961fb]'/>
                <Button text= {'đăng ký'} textColor= 'text-white' bgColor= 'bg-[#3961fb]'/>
                <Button text= {'đăng tin mới'} textColor= 'text-white' bgColor= 'bg-[#8717fb]' IcAfter={AiOutlinePlusCircle}/>
            </div>
        </div>
    )
};

export default Header