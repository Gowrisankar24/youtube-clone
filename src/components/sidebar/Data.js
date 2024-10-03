import {
    MdOutlineHome,
    MdShop,
    MdOutlineLocalFireDepartment,
    MdLocalMovies,
} from 'react-icons/md';
import { SiYoutubemusic, SiYoutubegaming } from 'react-icons/si';
import { VscHistory } from 'react-icons/vsc';
import { CiRedo } from 'react-icons/ci';
import {
    BsHandThumbsUp,
    BsCollectionPlay,
    BsMusicNote,
    BsNewspaper,
    BsTrophy,
    BsLightbulb,
} from 'react-icons/bs';
import { TfiLayoutSidebar2 } from 'react-icons/tfi';
import { GiEskimo } from 'react-icons/gi';

export const SideBarItems = {
    Top: [
        { icon: <MdOutlineHome size={25} />, name: 'Home', link: '/' },
        { icon: <SiYoutubemusic size={25} />, name: 'Shorts', link: '/shorts' },
        {
            icon: <MdShop size={25} />,
            name: 'Subscriptions',
            link: '/subscriptions',
        },
    ],
    Middle: [
        {
            icon: <BsCollectionPlay size={25} />,
            name: 'Library',
            link: '/library',
        },
        { icon: <VscHistory size={25} />, name: 'History', link: '/history' },
        {
            icon: <CiRedo size={25} />,
            name: 'Watch Later',
            link: '/watchlater',
        },
        {
            icon: <BsHandThumbsUp size={25} />,
            name: 'Liked Videos',
            link: '/likedvideos',
        },
    ],
    Explore: [
        {
            icon: <MdOutlineLocalFireDepartment size={25} />,
            name: 'Trending',
            link: '/trending',
        },
        { icon: <BsMusicNote size={25} />, name: 'Music', link: '/music' },
        {
            icon: <TfiLayoutSidebar2 size={25} />,
            name: 'Movies',
            link: '/movies',
        },
        { icon: <MdLocalMovies size={25} />, name: 'Live', link: '/live' },
        {
            icon: <SiYoutubegaming size={25} />,
            name: 'Gaming',
            link: '/gaming',
        },
        { icon: <BsNewspaper size={25} />, name: 'News', link: '/news' },
        { icon: <BsTrophy size={25} />, name: 'Sports', link: '/sprots' },
        {
            icon: <BsLightbulb size={25} />,
            name: 'Learning',
            link: '/learning',
        },
        {
            icon: <GiEskimo size={25} />,
            name: 'Fashion & Beauty',
            link: '/fashion&beauty',
        },
    ],
};

export const SideBarMinimizedItems = {
    items: [
        { icon: <MdOutlineHome size={30} />, name: 'Home' },
        { icon: <SiYoutubemusic size={30} />, name: 'Shorts' },
        { icon: <MdShop size={30} />, name: 'Subscriptions' },
        { icon: <BsCollectionPlay size={30} />, name: 'Library' },
    ],
};

export const CategoryItems = [
    'All',
    'Music',
    'Mixes',
    'Tamil Cinema',
    'Live',
    'Yuvan Shankar Raja',
    'AR Rahmaan',
    'ReactRouter',
    'Web Development',
    'Python',
    'java',
    'C#',
    'C',
    'Cricket',
    'Gaming',
    'Tamil television Drama',
    'Test Cricket',
    'PodCasts',
    'Mixes',
    'Dramedy',
    'Computer Programming',
    'Live',
    'Gadgets',
    'Numerical Analysis',
    'Highlight Flims',
];
