import React, { useEffect, useState } from 'react';
import { SideBarItems } from './Data';
import { HiMenu } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assests/yt-logo.png';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Firebase';

export const Sidebar = ({ setDrawerOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location?.state?.key || 'Home');
    const [shortsInitialData, setShortsInitialData] = useState([]);
    useEffect(() => {
        const getQuery = query(collection(db, 'shorts'));
        onSnapshot(getQuery, snapShot => {
            setShortsInitialData(
                snapShot?.docs?.map(d => ({
                    ...d?.data(),
                    id: d?.id,
                }))
            );
        });
    }, []);
    const handleClick = value => {
        if (value?.name === 'Shorts') {
            navigate(`${value?.link}/${shortsInitialData[0]?.id}`, { state: { key: value?.name } });
            setDrawerOpen(false);
        } else {
            navigate(value?.link, { state: { key: value?.name } });
        }
        setActive(value?.name);
    };

    return (
        <>
            <div className="bg-yt-black flex justify-between items-center !cursor-pointer">
                <div
                    className="ms-2 text-yt-white p-2 w-25 text-2xl text-center hover:bg-yt-lightblack rounded-full cursor-pointer"
                    onClick={() => {
                        setDrawerOpen(false);
                    }}>
                    <HiMenu size={25} />
                </div>
                <div
                    className="pr-5 pl-4 py-5 w-28"
                    onClick={() => {
                        setDrawerOpen(false);
                    }}>
                    <Link to="/">
                        <img src={logo} alt="" className="object-contain" />
                    </Link>
                </div>
            </div>
            <div className="sidebar-scroll w-64 bg-yt-black h-[95vh] mt-14 fixed top-0 left-0 text-yt-white p-3 overflow-y-scroll overflow-x-hidden">
                <div className="mb-4">
                    {SideBarItems?.Top?.map((i, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                                    i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                                }`}
                                onClick={() => handleClick(i)}>
                                <span className="mr-5">{i.icon}</span>
                                <span className="p-2 text-sm font-medium">{i.name} </span>
                            </div>
                        );
                    })}
                </div>
                <hr className="!text-yt-lightblack my-2" />
                <div className="mb-4">
                    {SideBarItems?.Middle?.map((i, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                                    i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                                }`}
                                onClick={() => handleClick(i)}>
                                <span className="mr-5">{i.icon}</span>
                                <span className="p-2 text-sm font-medium">{i.name} </span>
                            </div>
                        );
                    })}
                </div>
                <hr className="text-yt-lightblack my-2" />
                <span className="pt-1 px-3">Explore</span>
                <div className="mb-4">
                    {SideBarItems?.Explore?.map((i, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex h-10 justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-lightblack my-1 ${
                                    i.name === active ? 'bg-yt-lightblack' : 'bg-yt-black'
                                }`}
                                onClick={() => handleClick(i)}>
                                <span className="mr-5">{i.icon}</span>
                                <span className="p-2 text-sm font-medium">{i.name} </span>
                            </div>
                        );
                    })}
                </div>
                <hr className="text-yt-lightblack my-2" />
            </div>
        </>
    );
};
