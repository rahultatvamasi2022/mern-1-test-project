import React from "react";

import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center">
      <div className="w-full py-3 px-72 flex items-center justify-between text-sm font-medium text-white bg-headerBackground">
        <div className="flex items-center hover:cursor-pointer hover:underline transition-all duration-200">
          <EmailIcon style={{ color: "#69D600" }} />
          <p className="ml-1 font-normal">
            <span>info@gmail.com</span>
          </p>
        </div>
        <div className="flex">
          <div className="flex items-center pr-3 border-r-2 font-normal border-secondaryBorder hover:underline transition-all duration-1000 ease-in-out cursor-pointer">
            <Person2RoundedIcon style={{ color: "#69D600" }} />
            <Link to="/signin" className="ml-1">
              <span>Login</span>
            </Link>
          </div>
          <div className="flex pl-3 items-center">
            <HeadsetMicRoundedIcon style={{ color: "#69D600" }} />
            <p className="ml-1 font-normal">
              <span>Help Center</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pl-96 pr-72 py-6 flex items-center justify-between text-primary text-md font-medium border border-headerBorder">
        <div className="flex items-center">
          <div className="mx-7">Home</div>
          <div className="mx-7">How It Works</div>
          <div className="mx-7 flex items-center">
            <p>
              <span>Shop</span>
            </p>
            <ExpandMoreRoundedIcon />
          </div>
          <div className="mx-7">Solar Calculator</div>
          <div className="mx-7">Learn</div>
        </div>
        <div className="px-5 py-3 rounded-md hover:cursor-pointer text-white font-bold bg-buttonBackground">
          <span>Get Quote</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
