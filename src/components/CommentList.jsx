import React from 'react';

export const CommentList = ({ name, uploaded, image, content }) => {
    console.log('div', content);
    return (
        <div className='flex flex-row mb-3'>
            <img
                src={image}
                alt='Profile'
                className='w-11 h-11 rounded-full mr-3'
            />
            <div>
                <div className='flex items-center'>
                    <p className='font-medium text-sm pr-2'>{name}</p>
                    <p className='text-xs text-yt-gray'>
                        {/* {new Date(uploaded.toDate()).toString().slice(0, 25)} */}
                    </p>
                </div>
                <p className='text-base pt-3'>{content}</p>
            </div>
        </div>
    );
};
