import { doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';

export const Shorts = () => {
    const [shortsData, setShortsData] = useState(null);
    const { shortsId } = useParams();

    //get shorts Data
    useEffect(() => {
        if (shortsId) {
            const getQuery = query(doc(db, 'shorts', shortsId));
            onSnapshot(getQuery, snapShot => {
                setShortsData(snapShot?.data());
            });
        }
    }, [shortsId]);

    console.log('shortsData', shortsId);
    return (
        <div className='bg-yt-black flex h-full'>
            <div className='flex justify-center'>
                <span className='!text-yt-black'> Hello</span>
            </div>
        </div>
    );
};
