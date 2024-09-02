import {
  MdOutlineHome,
  MdShop,
  MdOutlineLocalFireDepartment,
  MdLocalMovies,
} from "react-icons/md";
import { SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { VscHistory } from "react-icons/vsc";
import { CiRedo } from "react-icons/ci";
import {
  BsHandThumbsUp,
  BsCollectionPlay,
  BsMusicNote,
  BsNewspaper,
  BsTrophy,
  BsLightbulb,
} from "react-icons/bs";
import { TfiLayoutSidebar2 } from "react-icons/tfi";
import { GiEskimo } from "react-icons/gi";

export const SideBarItems = {
  Top: [
    { icon: <MdOutlineHome size={25} />, name: "Home" },
    { icon: <SiYoutubemusic size={25} />, name: "Shorts" },
    { icon: <MdShop size={25} />, name: "Subscriptions" },
  ],
  Middle: [
    { icon: <BsCollectionPlay size={25} />, name: "Library" },
    { icon: <VscHistory size={25} />, name: "History" },
    { icon: <CiRedo size={25} />, name: "Watch Later" },
    { icon: <BsHandThumbsUp size={25} />, name: "Liked Videos" },
  ],
  Explore: [
    { icon: <MdOutlineLocalFireDepartment size={25} />, name: "Trending" },
    { icon: <BsMusicNote size={25} />, name: "Music" },
    { icon: <TfiLayoutSidebar2 size={25} />, name: "Movies" },
    { icon: <MdLocalMovies size={25} />, name: "Live" },
    { icon: <SiYoutubegaming size={25} />, name: "Gaming" },
    { icon: <BsNewspaper size={25} />, name: "News" },
    { icon: <BsTrophy size={25} />, name: "Sports" },
    { icon: <BsLightbulb size={25} />, name: "Learning" },
    { icon: <GiEskimo size={25} />, name: "Fashion & Beauty" },
  ],
};

export const SideBarMinimizedItems = {
  items: [
    { icon: <MdOutlineHome size={30} />, name: "Home" },
    { icon: <SiYoutubemusic size={30} />, name: "Shorts" },
    { icon: <MdShop size={30} />, name: "Subscriptions" },
    { icon: <BsCollectionPlay size={30} />, name: "Library" },
  ],
};

export const CategoryItems = [
  "All",
  "Music",
  "Mixes",
  "Tamil Cinema",
  "Live",
  "Yuvan Shankar Raja",
  "AR Rahmaan",
  "ReactRouter",
  "Web Development",
  "Python",
  "java",
  "C#",
  "C",
  "Cricket",
  "Gaming",
];
