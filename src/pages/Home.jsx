import React, { memo, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { CategoryItems } from '../components/sidebar/Data';
import { auth, db } from '../Firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducer/reducer';
import { VideosInfo } from '../components/sidebar/Videos';

const Home = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('All');
    const [videos, setVideos] = useState([]);
    const [getSearchableVideos, setGetSearchableVideos] = useState([]);
    const getSearchVideos = useSelector(state => state?.getSearchTextSlice?.text);

    //user authentication
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(null));
            }
        });
    }, [dispatch]);

    //get videos list data from firebase store
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
        setGetSearchableVideos(videos);
    }, [videos]);

    //Get Search input based videos
    useEffect(() => {
        const filteringVideos = videos?.filter(rec =>
            rec?.name.toLowerCase().includes(getSearchVideos?.toLowerCase())
        );
        setGetSearchableVideos(filteringVideos);
    }, [getSearchVideos]);

    return (
        <>
            <div className="w-full min-w-full max-w-full dashboard-height pt-16 bg-yt-black">
                <div className="flex flex-row px-5 relative overflow-x-scroll scrollbar-hide">
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
                <div className="pt-12 px-5 grid grid-cols-yt gap-x-3 gap-y-8 home-screen-scrollbar">
                    {getSearchableVideos?.length > 0 ? (
                        getSearchableVideos?.map(video => {
                            return (
                                <Link to={`/videos/${video?.id}`} key={video?.id}>
                                    <VideosInfo {...video} />
                                </Link>
                            );
                        })
                    ) : (
                        <div className="h-[86vh]"></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Home);
