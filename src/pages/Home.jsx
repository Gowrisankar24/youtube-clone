import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Sidebar } from '../components/sidebar/Sidebar';
import { CategoryItems } from '../components/sidebar/Data';
import { auth, db } from '../Firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../Reducer/reducer';
import { VideosInfo } from '../components/sidebar/Videos';

export const Home = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('All');
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const getresp = query(collection(db, 'videos'));
        onSnapshot(getresp, snapShot => {
            setVideos(
                snapShot.docs.map(d => ({
                    ...d.data(),
                    id: d.id,
                }))
            );
        });
    }, [dispatch]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(null));
            }
        });
    }, [dispatch]);
    return (
        <>
            <div>
                <Sidebar />
            </div>
            <div className='w-(calc(100% - 250px)) h-calc(100% - 50px) pt-16 bg-yt-black ml-60'>
                <div className='flex flex-row px-3 relative overflow-x-scroll scrollbar-hide'>
                    {CategoryItems?.map((item, index) => {
                        return (
                            <h2
                                className={`text-yt-white font-medium text-sm px-3 py-1 break-keep whitespace-nowrap my-3 mr-3 bg-yt-lightblack cursor-pointer rounded-lg hover:bg-yt-gray ${
                                    item === activeCategory
                                        ? 'bg-yt-white !text-yt-black transition'
                                        : 'bg-yt-lightblack text-yt-white'
                                }`}
                                key={index}
                                onClick={() => setActiveCategory(item)}>
                                {item}
                            </h2>
                        );
                    })}
                </div>

                {/* rendering videos */}
                <div className='pt-12 px-5 grid grid-cols-yt gap-x-3 gap-y-8'>
                    {videos?.length > 0 ? (
                        videos?.map((video, i) => {
                            return (
                                <Link
                                    to={`/videos/${video?.id}`}
                                    key={video?.id}>
                                    <VideosInfo {...video} />
                                </Link>
                            );
                        })
                    ) : (
                        <div className='h-[86vh]'></div>
                    )}
                </div>
            </div>
        </>
    );
};
