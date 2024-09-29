import React, { useState } from 'react';
import { SideBarItems } from './Data';

export const Sidebar = () => {
  const [active, setActive] = useState('Home');
  return (
    <>
      <div className='side-scroll scrollbar-hide w-64 bg-yt-black h-[95vh] mt-14 fixed top-0 left-0 text-yt-white p-3 overflow-y-scroll'>
        <div className='mb-4'>
          {SideBarItems?.Top?.map((i, index) => {
            return (
              <div
                key={index}
                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                  i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                }`}
                onClick={() => setActive(i.name)}>
                <span className='mr-5'>{i.icon}</span>
                <span className='p-2 text-sm font-medium'>{i.name} </span>
              </div>
            );
          })}
        </div>
        <hr className='!text-yt-lightblack my-2' />
        <div className='mb-4'>
          {SideBarItems?.Middle?.map((i, index) => {
            return (
              <div
                key={index}
                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                  i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                }`}
                onClick={() => setActive(i.name)}>
                <span className='mr-5'>{i.icon}</span>
                <span className='p-2 text-sm font-medium'>{i.name} </span>
              </div>
            );
          })}
        </div>
        <hr className='text-yt-lightblack my-2' />
        <span className='pt-1 px-3'>Explore</span>
        <div className='mb-4'>
          {SideBarItems?.Explore?.map((i, index) => {
            return (
              <div
                key={index}
                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                  i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                }`}
                onClick={() => setActive(i.name)}>
                <span className='mr-5'>{i.icon}</span>
                <span className='p-2 text-sm font-medium'>{i.name} </span>
              </div>
            );
          })}
        </div>
        <hr className='text-yt-lightblack my-2' />
      </div>
    </>
  );
};
