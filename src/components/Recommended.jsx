import React from 'react';
import { LuDot } from 'react-icons/lu';
export const Recommended = ({
    thumbnail,
    name,
    uploadTime,
    channel,
    views,
}) => {
    return (
        <div className='text-yt-white flex cursor-pointer'>
            <img
                src={thumbnail}
                alt=''
                className='h-32 w-52 rounded-2xl object-contain'
            />
            <div className='pl-2'>
                <h2 className='text-sm font-medium'>
                    {name?.length <= 70 ? name : `${name.slice(0, 70)}...`}
                </h2>
                <p className='text-xs text-yt-gray pt-2'>{channel}</p>
                <p className='text-yt-gray pr-1 text-xs flex'>
                    {views} views
                    <span className='flex'>
                        <LuDot size={20} className='ml-1' />
                        {uploadTime}
                    </span>
                </p>
            </div>
        </div>
    );
};
