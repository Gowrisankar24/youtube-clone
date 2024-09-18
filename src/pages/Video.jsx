import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, doc, onSnapshot, query } from 'firebase/firestore';
import { auth, db, timestamp } from '../Firebase';
import { AiFillLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { FaRegShareSquare } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdOutlineSort } from 'react-icons/md';
import { getUser, setUser } from '../Reducer/reducer';
import { onAuthStateChanged } from 'firebase/auth';
import { CommentList } from '../components/CommentList';
import { CategoryItems } from '../components/sidebar/Data';
import { Recommended } from '../components/Recommended';

export const Video = () => {
    const dispatch = useDispatch();
    const [videos, setVideos] = useState([]);
    const [activeCategory, setActiveCategory] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [Comment, setComment] = useState([]);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const user = useSelector(getUser);

    //id(video) router data
    useEffect(() => {
        if (id) {
            const q = query(doc(db, 'videos', id));
            onSnapshot(q, snapShot => {
                setData(snapShot.data());
            });
            const getCommentsQuery = query(
                collection(db, 'videos', id, 'comments')
            );
            onSnapshot(getCommentsQuery, snapShot => {
                setCommentsList(
                    snapShot?.docs?.map(doc => ({
                        ...doc?.data(),
                        id: doc?.id,
                    }))
                );
            });
        }
    }, [id]);

    //auth preserve
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(null));
            }
        });
    }, [dispatch]);
    //get videos
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
    //add comment
    const appendComment = async e => {
        e?.preventDefault();
        let commentData = {
            image: user?.photoURL,
            name: user?.displayName,
            Comment,
            uploaded: timestamp,
        };
        console.log('console', commentData);
        if (id) {
            await addDoc(collection(db, 'videos', id, 'comments'), commentData);
            setComment('');
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //cancel comment
    const handleCancel = e => {
        e?.preventDefault();
        setComment('');
    };
    return (
        <div className='py-20 px-10 bg-yt-black flex flex-row h-full'>
            <div className='left flex-1'>
                <div className='flex justify-center'>
                    <iframe
                        src={`https://www.youtube.com/embed/${data?.link}?autoplay=1&mute=0&cc_load_policy=0`}
                        title='YouTube video player'
                        controls
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        className='w-[850px] h-[700px] flex-1 rounded-lg'
                    />
                </div>
                <h2 className='text-yt-white font-semibold mt-3 mb-1 text-lg'>
                    {data?.name}
                </h2>
                <div className='flex'>
                    <div className='flex items-center'>
                        <img
                            src={data?.logo}
                            alt={data?.name}
                            className='w-10 h-10 rounded-full'
                        />
                        <div className='px-3'>
                            <h3 className='text-yt-white font-semibold'>
                                {data?.channel && data?.channel?.length <= 25
                                    ? data?.channel
                                    : `${data?.channel.substr(0, 15)}...`}
                            </h3>
                            <p className='text-yt-gray text-sm font-medium'>
                                {data?.Subscribers} subscribers
                            </p>
                        </div>
                        <button className='bg-yt-white px-4 py-2 rounded-full text-sm font-medium ml-3'>
                            Subscribe
                        </button>
                        <div className='flex pl-28'>
                            <div className='flex bg-yt-lightblack items-center rounded-2xl h-10 mx-1 hover:bg-yt-light-1'>
                                <div className='flex px-3 items-center border-r-2 border-r-yt-light-1 cursor-pointer'>
                                    <AiFillLike className='text-yt-white text-2xl' />
                                    <p className='text-yt-white pl-2 pr-3 text-sm font-semibold'>
                                        300K
                                    </p>
                                </div>
                                <div className='cursor-pointer pl-4 pr-5'>
                                    <BiDislike className='text-[22px] font-extralight text-yt-white' />
                                </div>
                            </div>
                            <div className='flex bg-yt-lightblack items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1'>
                                <div className='flex px-3 items-center cursor-pointer'>
                                    <FaRegShareSquare className='text-2xl text-yt-white font-thin' />
                                    <p className='text-yt-white pl-2 pr-3 text-lg font-semibold'>
                                        share
                                    </p>
                                </div>
                            </div>
                            <div className='flex bg-yt-lightblack items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1'>
                                <div className='flex px-3 items-center cursor-pointer'>
                                    <IoMdDownload className='text-2xl text-yt-white font-thin' />
                                    <p className='text-yt-white pl-2 pr-3 text-lg font-semibold'>
                                        download
                                    </p>
                                </div>
                            </div>
                            <div className='flex bg-yt-lightblack cursor-pointer items-center rounded-full justify-center w-10 h-10 text-yt-white hover:bg-yt-light-1'>
                                <HiDotsHorizontal />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-4xl bg-yt-lightblack mt-4 rounded-2xl text-sm p-3 text-yt-white'>
                    <div className='flex'>
                        <p className='font-medium pr-3'>
                            {data?.views}
                            <span className='pl-1 text-xs'>Views</span>
                        </p>
                        <p className='font-medium pr-3'>{data?.uploadTime}</p>
                    </div>
                    <span className='text-center font-medium'>
                        {data?.description}
                    </span>
                </div>
                <div className='text-yt-white mt-5'>
                    <div className='flex items-center'>
                        <h1>{commentsList?.length} Comments</h1>
                        <div className='flex items-center mx-10'>
                            <MdOutlineSort size={30} className='mx-3' />
                            <h5>Sort By</h5>
                        </div>
                    </div>
                    {user && (
                        <>
                            <form className='flex w-[800px] pt-4 items-start'>
                                <img
                                    src={user?.photoURL}
                                    alt='Profile'
                                    className='rounded-full mr-3 h-12 w-12'
                                />
                                <input
                                    value={Comment}
                                    onChange={e => setComment(e?.target?.value)}
                                    placeholder='Add a comment...'
                                    className='bg-transparent border-b border-b-yt-lightblack outline-none text-sm p-1 w-full'
                                />
                                <div className='flex flex-row gap-x-3 justify-end'>
                                    <button
                                        className='flex items-center h-10 mx-1 p-3 hover:bg-yt-lightblack hover:rounded-2xl'
                                        onClick={handleCancel}>
                                        Cancel
                                    </button>
                                    <button
                                        disabled={Comment?.length === 0}
                                        onClick={appendComment}
                                        className='bg-blue-400 text-yt-white px-2 rounded-2xl'>
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                    <div className='mt-4'>
                        {commentsList?.map((item, i) => {
                            return <CommentList key={i} {...item} />;
                        })}
                    </div>
                </div>
            </div>
            <div className='rigtht px-3 overflow-y-hidden flex-[0.4]'>
                <div>
                    <div className='flex flex-row px-3 overflow-x-scroll relative side-scroll'>
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
                </div>
                <div className='pt-1'>
                    {videos?.map((video, i) => {
                        if (video?.id !== id) {
                            return (
                                <Link key={i} to={`/videos/${video?.id}`}>
                                    <Recommended {...video} />
                                </Link>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
