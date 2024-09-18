import React from 'react';
import { HiMenu, HiSearch } from 'react-icons/hi';
import { MdMicNone } from 'react-icons/md';
import { BiVideoPlus } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../assests/yt-logo.png';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, getUser, logout } from '../Reducer/reducer';

export const NavBar = () => {
    const dispatch = useDispatch();
    const userClick = useSelector(getUser);

    const handleClick = async () => {
        const response = await signInWithPopup(auth, provider);
        dispatch(setUser(response.user));
    };

    const handlelogout = async () => {
        dispatch(logout());
        await signOut(auth);
    };

    return (
        <div
            className={`bg-yt-black h-14 flex items-center pl-5 pr-5 justify-between fixed w-full z-10`}>
            <div className='flex justify-between items-center'>
                <div
                    className='text-yt-white p-2 w-25  text-2xl text-center hover:bg-yt-lightblack rounded-full cursor-pointer'
                    onClick={() => {}}>
                    <HiMenu size={25} />
                </div>
                <div className='pr-5 pl-4 py-5 w-28'>
                    <Link to='/'>
                        <img src={logo} alt='' className='object-contain' />
                    </Link>
                </div>
            </div>
            <div className='flex  h-10 flex-row items-center'>
                <div className='w-[600px] bg-yt-black flex border-2 border-yt-lightblack items-center rounded-3xl h-10 my-3'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-full bg-yt-black font-normal h-6 ml-1 text-yt-white text-start focus:outline-none pl-4'
                    />

                    <button className='w-16 h-10 bg-yt-lightblack  px-3 py-0.5 rounded-r-3xl border-l-yt-lightblack '>
                        <HiSearch
                            size={22}
                            className='text-yt-white inline-block text-center font-thin'
                        />
                    </button>
                </div>
                <div className='bg-yt-black  text-yt-white w-10 h-10 items-center flex justify-center rounded-full ml-2 hover:bg-yt-lightblack cursor-pointer'>
                    <MdMicNone size={23} className=' text-center' />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className=' flex flex-row  items-center'>
                    <div className=' mr-2 p-2 w-10 hover:bg-yt-lightblack rounded-full cursor-pointer'>
                        <BiVideoPlus
                            size={25}
                            className=' text-yt-white text-center'
                        />
                    </div>
                    <div className='mx-2 p-2 w-10 hover:bg-yt-lightblack rounded-full cursor-pointer'>
                        <BsBell
                            size={19}
                            className=' text-yt-white text-center'
                        />
                    </div>
                    <div className='mx-2 items-center cursor-pointer'>
                        {!userClick ? (
                            <>
                                <button
                                    className=' bg-yt-orange rounded-md  py-1 px-4 text-yt-white'
                                    onClick={handleClick}>
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                <img
                                    src={userClick?.photoURL}
                                    alt={userClick?.displayName}
                                    onClick={handlelogout}
                                    className=' object-contain rounded-full text-center cursor-pointer w-10 h-10'
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
