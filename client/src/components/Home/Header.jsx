import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";

import User from "./User";
import { signOutUser } from "../../features/auth/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: profile, isAuthenticated } = useSelector((state) => state.auth);

  const [searchInput, setSearchInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [users, setUsers] = useState([]);
  const firstNameLetter = profile?.user?.firstname?.split("")[0];

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  const handleUserSearchInputOnFocus = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/users`, {
        withCredentials: true,
      });

      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSearchInputOnBlur = () => {
    setUsersList([]);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }

    // console.log(usersList);
    const filterUsersList = usersList.filter((user) =>
      user.fullname.toLowerCase().includes(searchInput.toLowerCase())
    );

    setUsers(filterUsersList);
  }, [isAuthenticated, navigate, searchInput, usersList]);

  // console.log(users);

  return (
    <header className="w-full py-5 flex justify-between pl-[50px] md:pl-[100px] lg:pl-[120px] xl:pl-[204px] pr-[50px] md:pr-[100px] bg-headerBackground">
      <div className="relative w-[250px] md:w-[320px] lg:w-[370px] h-10 flex flex-col items-center text-md font-medium text-white bg-white bg-opacity-5 rounded-md ">
        <div className="relative w-full h-full flex items-center">
          <div className="px-2">
            <span>
              <SearchRoundedIcon style={{ color: "#69D600" }} />
            </span>
          </div>
          <input
            type="text"
            value={searchInput}
            onBlur={handleUserSearchInputOnBlur}
            onFocus={handleUserSearchInputOnFocus}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full h-full bg-white bg-opacity-0 placeholder:text-[#F9FAFB] outline-none"
            placeholder="Search"
          />
          {searchInput.length > 0 && users.length > 0 && (
            <div
              className={
                "absolute top-12 w-full max-h-60 flex flex-col text-primary bg-white overflow-y-scroll"
              }
            >
              {users.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  setUsers={setUsers}
                  handleUserSearchInputOnBlur={handleUserSearchInputOnBlur}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-10 flex items-center text-md font-medium text-white">
        <div className="mr-[10px] lg:mr-[30px]">
          <span></span>
          <span>
            <NotificationsNoneRoundedIcon />
          </span>
        </div>
        <div className="px-7 lg:px-10 border-x border-x-[#EFF1F3]">
          <div className="cursor-pointer">
            <span className="mr-1">Help</span>
            <span>
              <HelpOutlineRoundedIcon />
            </span>
          </div>
        </div>
        <div className="px-6 lg:px-10 border-r border-r-[#EFF1F3]">
          <div className="cursor-pointer">
            <span className="mr-1">Support</span>
            <span>
              <HeadsetMicRoundedIcon />
            </span>
          </div>
        </div>
        <div className="group relatve flex items-center ml-6 lg:ml-10 cursor-pointer">
          <p className="mr-2">
            <span>Hi, </span>
            <span>{profile?.user?.firstname}</span>
          </p>
          <div className="relative w-[43px] h-[43px] flex items-center justify-center text-[23px] font-normal bg-buttonBackground rounded">
            <span>{firstNameLetter}</span>
          </div>
          <div className="w-28 h-12 absolute top-16 right-16 group-hover:opacity-100 opacity-0 flex items-center justify-center bg-[#EFF1F3] border border-secondaryBorder text-[#000]">
            <div className="w-full h-full flex items-center justify-center">
              <button onClick={handleSignOut}>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
