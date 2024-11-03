import React, { memo } from 'react';

const SearchItem = ({ IconBefore, IconAfter, buttonText, fontWeight, defaultText }) => {
    return (
        <div className='bg-white py-2 px-4 w-full rounded-md text-gray-400 text-[13.3px] flex items-center justify-between'>
            <div className='flex items-center gap-1 w-full'>
                {IconBefore}
                <button
                    className={`w-[100px] ${fontWeight ? 'font-medium text-black' : ''} ${buttonText ? 'font-medium text-black' : ''} overflow-hidden text-ellipsis whitespace-nowrap overflow-hidden text-ellipsis whitespace-nowrap underline hover:no-underline`}
                >
                    {buttonText || defaultText}
                </button>
            </div>
            {IconAfter}
        </div>
    );
}

export default memo(SearchItem);
