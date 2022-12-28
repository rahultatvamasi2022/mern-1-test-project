import React from "react";
import { useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const firstNameLetter = user?.firstname?.split("")[0];

  return (
    <header className="w-full py-5 flex justify-between pl-[300px] pr-[100px] bg-headerBackground">
      <div className="w-[370px] h-10 flex items-center text-md font-medium text-white bg-white bg-opacity-5 rounded-md overflow-hidden">
        <div className="px-2">
          <span>
            <SearchRoundedIcon style={{ color: "#69D600" }} />
          </span>
        </div>
        <form className="w-full h-full">
          <input
            type="text"
            className="w-full h-full bg-white bg-opacity-0 placeholder:text-[#F9FAFB] outline-none"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="h-10 flex items-center text-md font-medium text-white">
        <div className="mr-[30px]">
          <span></span>
          <span>
            <NotificationsNoneRoundedIcon />
          </span>
        </div>
        <div className="px-10 border-x border-x-[#EFF1F3]">
          <div className="cursor-pointer">
            <span className="mr-1">Help</span>
            <span>
              <HelpOutlineRoundedIcon />
            </span>
          </div>
        </div>
        <div className="px-10 border-r border-r-[#EFF1F3]">
          <div className="cursor-pointer">
            <span className="mr-1">Support</span>
            <span>
              <HeadsetMicRoundedIcon />
            </span>
          </div>
        </div>
        <div className="flex items-center ml-10">
          <p className="mr-2">
            <span>Hi, </span>
            <span>{user?.firstname}</span>
          </p>
          <div className="w-[43px] h-[43px] flex items-center justify-center text-[23px] font-normal bg-buttonBackground rounded">
            <span>{firstNameLetter}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
