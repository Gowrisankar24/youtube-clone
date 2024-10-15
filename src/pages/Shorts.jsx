import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { Skeleton } from '@mui/material';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
export const Shorts = () => {
    const navigate = useNavigate();
    const { shortsId } = useParams();
    const location = useLocation();
    const [shortsData, setShortsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [player, setPlayer] = useState(null);

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
    console.log('currentIndex', currentIndex);
    return (
        <div className="w-full min-w-full max-w-full bg-yt-black">
            <div className="pt-16">
                <div className="flex justify-center items-center">
                    <iframe
                        width="315"
                        height="678"
                        src={`https://www.youtube.com/embed/${currentShort.link}?autoplay=1&mute=0&cc_load_policy=3&loop=1&type=channel&modestbranding=1&rel=0&enablejsapi=1`}
                        title={currentShort?.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        id="player"
                    />
                    <div className="flex flex-col p-2">
                        <div className="flex flex-col ms-3 p-2">
                            <div className="bg-yt-lightblack p-3 rounded-full cursor-pointer">
                                <BiSolidLike size={30} className="text-yt-white" />
                            </div>
                            <span className="text-yt-white relative top-2 left-4 font-semibold">
                                {currentShort?.like}
                            </span>
                        </div>
                        <div className="flex flex-col ms-3 p-2">
                            <div className="bg-yt-lightblack p-3 rounded-full cursor-pointer">
                                <BiSolidDislike size={30} className="text-yt-white" />
                            </div>
                            <span className="text-yt-white relative top-2 left-4 font-semibold">
                                {currentShort?.dislike}
                            </span>
                        </div>
                        <div className="flex flex-col ms-3 p-2">
                            <div className="bg-yt-lightblack p-3 rounded-full cursor-pointer">
                                <MdOutlineComment size={30} className="text-yt-white" />
                            </div>
                            <span className="text-yt-white relative top-2 left-4 font-semibold">
                                {currentShort?.comments}
                            </span>
                        </div>
                        <div className="flex flex-col ms-3 p-2 cursor-pointer">
                            <img
                                src={currentShort?.logo}
                                alt={currentShort?.imgname}
                                className="rounded-2xl"
                                width={50}
                            />
                        </div>
                    </div>
                </div>
                <div className="fixed right-5 top-[40%]">
                    <div
                        className={`bg-yt-lightblack p-3 rounded-3xl cursor-pointer transition-opacity duration-500 ease-in-out hover:bg-gray-400 ${currentIndex > 0 ? 'visible opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-[90px]'}`}
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
    );
};
