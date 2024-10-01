import React from 'react';
import { MdVerified } from 'react-icons/md';
// import { LuDot } from 'react-icons/lu';

export const VideosInfo = ({
    id,
    Subscribers,
    uploadTime,
    channel,
    description,
    duration,
    link,
    logo,
    name,
    thumbnail,
    views,
}) => {
    return (
        <>
            <div className='flex flex-col max-w-[260px] cursor-pointer'>
                <div className='relative w-full'>
                    <img
                        src={thumbnail}
                        alt=''
                        className='h-full w-full overflow-hidden rounded-2xl'
                    />
                    <p className='absolute right-2 top-[85%] px-1 text-xs bg-yt-black text-yt-white rounded'>
                        {duration}
                    </p>
                </div>
                <div className='flex mt-3'>
                    <img src={logo} alt='' className=' h-9 w-9 rounded-full' />
                    <div className=' ml-2'>
                        <h2 className=' mt-0 mb-0 items-center text-yt-white text-sm font-medium'>
                            {name.length <= 70
                                ? name
                                : `${name.substr(0, 60)}...`}
                        </h2>
                        <h3 className=' text-yt-gray text-xs mt-1 flex items-center'>
                            {channel}
                            <span className=' p-1'>
                                <MdVerified />
                            </span>
                        </h3>
                        <p className=' m-0 text-yt-gray font-medium text-xs flex'>
                            {/* {views} views
                            <span className='ml-1 flex'>
                                <LuDot />
                                {uploadTime}
                            </span> */}
                            {views} Views • {uploadTime}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
