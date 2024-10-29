import React, { useEffect, useState } from 'react';
import { HiMenu, HiSearch } from 'react-icons/hi';
import { MdMicNone } from 'react-icons/md';
import { BiVideoPlus } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logo from '../assests/yt-logo.png';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, getUser, logout } from '../reducer/reducer';
import { Drawer } from '@mui/material';
import { Sidebar } from './sidebar/Sidebar';
import { getText } from '../reducer/getSearchText';
import { debounce } from 'lodash';

export const NavBar = () => {
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [inputChangeText, setInputChangeText] = useState('');
    const [enableOverFlowSearch, setEnableOverFlowSearch] = useState(false);
    const userClick = useSelector(getUser);

    //attain responsive search box func
    const checkOverFlow = () => {
        if (window?.innerHeight < 210) {
            setIsOverFlow(true);
        } else {
            setIsOverFlow(false);
            setEnableOverFlowSearch(false);
        }
    };

    useEffect(() => {
        checkOverFlow();
        window.addEventListener('resize', checkOverFlow);
        return () => window.removeEventListener('resize', checkOverFlow);
    }, [isOverFlow]);
    //

    // google signin trigger
    const handleClick = async () => {
        const response = await signInWithPopup(auth, provider);
        dispatch(setUser(response.user));
    };
    //

    //user logout func
    const handlelogout = async () => {
        dispatch(logout());
        await signOut(auth);
        setIsLogout(false);
    };

    const handleLogoutPopup = () => {
        setIsLogout(true);
    };

    const handleCancle = () => {
        setIsLogout(false);
    };
    //

    //overflow search bar func
    const handleOverflowSearch = () => {
        setEnableOverFlowSearch(true);
    };

    const handleSearchBack = () => {
        setEnableOverFlowSearch(false);
    };
    //

    //search input onchange fun
    const handleInputChange = e => {
        setInputChangeText(e?.target?.value);
    };
    //

    //search button submit
    const handleSearchChange = e => {
        dispatch(getText(inputChangeText));
    };
    const debounceSearchText = debounce(e => handleInputChange(e), 1000);
    //
    return (
        <header className="sticky z-50 overflow-hidden">
            <div
                className={`bg-yt-black h-14 flex items-center pl-5 pr-5 justify-between fixed w-full z-10`}>
                <div className="flex justify-between items-center">
                    <div
                        className="text-yt-white p-2 w-25  text-2xl text-center hover:bg-yt-lightblack rounded-full cursor-pointer"
                        onClick={() => {
                            setDrawerOpen(true);
                        }}>
                        <HiMenu size={25} />
                    </div>
                    <div className="pr-5 pl-4 py-5 w-28">
                        <Link to="/">
                            <img src={logo} alt="" className="object-contain" />
                        </Link>
                    </div>
                </div>
                <div className="flex  h-10 flex-row items-center">
                    {!isOverFlow ? (
                        <div
                            className={`w-[100px] bg-yt-black flex border-2 border-yt-lightblack items-center rounded-3xl h-10 my-3 sm:w-[100px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] ${enableOverFlowSearch ? 'invisible' : 'visible'}`}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-yt-black font-normal h-6 ml-1 text-yt-white text-start focus:outline-none pl-4"
                                onChange={debounceSearchText}
                            />

                            <button
                                className="w-16 h-10 bg-yt-lightblack  px-3 py-0.5 rounded-r-3xl border-l-yt-lightblack"
                                onClick={handleSearchChange}>
                                <HiSearch
                                    size={22}
                                    className="text-yt-white inline-block text-center font-thin"
                                />
                            </button>
                        </div>
                    ) : (
                        <button
                            className={`w-10 h-10 bg-yt-lightblack p-2 rounded-full float-right ${enableOverFlowSearch ? 'invisible' : 'visible'}`}
                            onClick={handleOverflowSearch}>
                            <HiSearch
                                size={22}
                                className="text-yt-white inline-block text-center font-thin"
                            />
                        </button>
                    )}
                    {enableOverFlowSearch ? (
                        <>
                            <IoArrowBackCircle
                                size={22}
                                className="absolute left-1 text-white float-left cursor-pointer"
                                onClick={handleSearchBack}
                            />
                            <div className="absolute left-7 w-[200px] bg-yt-black flex border-2 border-yt-lightblack items-center rounded-3xl h-10 my-3 hover:bg-current">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full bg-yt-black font-normal h-6 ml-1 text-yt-white text-start focus:outline-none pl-4"
                                    onChange={debounceSearchText}
                                />

                                <button className="w-16 h-10 bg-yt-lightblack  px-3 py-0.5 rounded-r-3xl border-l-yt-lightblack ">
                                    <HiSearch
                                        size={22}
                                        className="text-yt-white inline-block text-center font-thin"
                                        onClick={handleSearchChange}
                                    />
                                </button>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {/* <div className="bg-yt-black  text-yt-white w-10 h-10 items-center flex justify-center rounded-full ml-2 hover:bg-yt-lightblack cursor-pointer">
                        <MdMicNone size={23} className=" text-center" />
                    </div> */}
                </div>
                <div className="flex float-right">
                    <div className="flex flex-row justify-center ">
                        {/* <div className=" mr-2 p-2 w-10 hover:bg-yt-lightblack rounded-full cursor-pointer">
                            <BiVideoPlus size={25} className=" text-yt-white text-center" />
                        </div>
                        <div className="mx-2 p-2 w-10 hover:bg-yt-lightblack rounded-full cursor-pointer">
                            <BsBell size={19} className=" text-yt-white text-center" />
                        </div> */}
                        <div className="me-1 justify-center content-center text-center items-center cursor-pointer">
                            {!userClick ? (
                                <button
                                    className="flex flex-row justify-center text-center bg-transparent border-[1px] border-slate-400 rounded-lg text-yt-white p-2"
                                    onClick={handleClick}>
                                    <FaRegUserCircle className="text-lg me-1 mt-1" /> Sign In
                                </button>
                            ) : (
                                <>
                                    <img
                                        src={userClick?.photoURL}
                                        alt={userClick?.displayName}
                                        onClick={handleLogoutPopup}
                                        className="object-contain rounded-full text-center cursor-pointer w-10 h-10"
                                    />
                                </>
                            )}

                            <div
                                className={`absolute right-1 bg-black p-4 text-white ${isLogout ? 'visible' : 'invisible'} `}>
                                <p>Do you want to Log out</p>
                                <div className="float-right p-3">
                                    <button
                                        className="p-1 bg-blue-400 rounded-lg me-2"
                                        onClick={handleCancle}>
                                        Cancel
                                    </button>
                                    <button
                                        className="p-1 bg-blue-400 rounded-lg"
                                        onClick={handlelogout}>
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} className="sidebar">
                <Sidebar setDrawerOpen={setDrawerOpen} />
            </Drawer>
        </header>
    );
};
