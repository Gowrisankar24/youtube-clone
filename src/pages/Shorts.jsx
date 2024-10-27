import React, { memo, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { Skeleton } from '@mui/material';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
const Shorts = () => {
    const navigate = useNavigate();
    const { shortsId } = useParams();
    const [shortsData, setShortsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    //get shorts Data
    useEffect(() => {
        const getQuery = query(collection(db, 'shorts'));
        onSnapshot(getQuery, snapShot => {
            setShortsData(
                snapShot?.docs?.map(d => ({
                    ...d?.data(),
                    id: d?.id,
                }))
            );
        });
    }, []);

    // Update current video index based on the URL's shortsId
    useEffect(() => {
        if (shortsId && shortsData?.length > 0) {
            const currentIndex = shortsData?.findIndex(short => short.id === shortsId);
            setCurrentIndex(currentIndex !== -1 ? currentIndex : 0);
        }
    }, [shortsId, shortsData]);

    // // Function to handle when a video ends, move to the next video
    // const handleVideoEnd = () => {
    //     const nextVideoIndex = currentIndex + 1;
    //     if (nextVideoIndex < shortsData?.length) {
    //         setCurrentIndex(nextVideoIndex);
    //         navigate(`shorts/${shortsData[nextVideoIndex]?.id}`);
    //         player.loadVideoById(shortsData[nextVideoIndex].link);
    //     } else {
    //         setCurrentIndex(0);
    //         navigate(`/shorts/${shortsData[0]?.id}`);
    //         player.loadVideoById(shortsData[0]?.link);
    //     }
    // };
    const currentShort = shortsData[currentIndex];
    if (!currentShort) {
        return <Skeleton animation="wave" width={120} height="90%" />;
    }
    return (
        <>
            <div className="flex justify-center h-screen relative min-h-screen max-h-screen">
                <div className="flex justify-center">
                    <div className="flex flex-row justify-center items-center max-w-full">
                        <iframe
                            width="30%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${currentShort?.link}?autoplay=1&loop=0&autohide=0&controls=0&nologo=0&iv_load_policy=3&rel=0&modestbranding=1`}
                            title={currentShort?.name}
                            allow="autoplay; encrypted-media; accelerometer;picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="rounded-lg object-contain aspect-video max-w-full min-h-full h-full max-h-full"
                            style={{ maxHeight: '90vh' }}
                        />
                        <div className="flex flex-col justify-end items-center text-center relative left-5 gap-2 h-[90vh] max-h-[90vh] min-[90vh]: md:gap-3 xl:gap-2 2xl:gap-1">
                            <div className="shorts-icons-wrapper">
                                <span className="shorts-icons text-size">
                                    <BiSolidLike className="!text-yt-white" />
                                </span>
                                <span className=" !text-yt-white items-center font-normal">
                                    {currentShort?.like}
                                </span>
                            </div>
                            <div className="shorts-icons-wrapper">
                                <span className="shorts-icons  text-size">
                                    <BiSolidDislike className="!text-yt-white " />
                                </span>
                                <span className="!text-yt-white font-normal">
                                    {currentShort?.dislike}
                                </span>
                            </div>
                            <div className="shorts-icons-wrapper ">
                                <span className="shorts-icons text-size">
                                    <MdOutlineComment className="!text-yt-white" />
                                </span>
                                <span className="!text-yt-white font-normal">
                                    {currentShort?.comments}
                                </span>
                            </div>
                            <div className="shorts-icons-wrapper text-size">
                                <img
                                    src={currentShort?.logo}
                                    alt={currentShort?.imgname}
                                    className="rounded-full w-3 bg-cover sm:w-7 md:w-8 lg:w-14 xl:w-16 2xl:w-16"
                                    // width={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="fixed top-[40%] right-5">
                        <div
                            className={`bg-yt-lightblack p-3 rounded-3xl cursor-pointer transition-opacity duration-1000 ease-in-out hover:bg-gray-400 ${currentIndex > 0 ? 'visible opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-[190px]'}`}
                            onClick={() => {
                                navigate(`/shorts/${shortsData[currentIndex - 1]?.id}`);
                            }}>
                            <FaArrowUp size={20} color="white" />
                        </div>

                        <div
                            className="bg-yt-lightblack p-3 rounded-3xl cursor-pointer mt-2 hover:bg-gray-400"
                            onClick={() => {
                                navigate(`/shorts/${shortsData[currentIndex + 1]?.id}`);
                            }}>
                            <FaArrowDown size={20} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Shorts);
