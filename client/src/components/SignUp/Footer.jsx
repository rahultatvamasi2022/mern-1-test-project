import React from "react";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Footer = () => {
  return (
    <>
      <div className="absolute z-10 -right-36 bottom-64 w-64 h-64 bg-buttonBackground rotate-[58deg] rounded-[46px]" />
      <div className="relative  w-full h-96 bg-headerBackground text-white text-md font-medium">
        <footer className="relative overflow-hidden w-full h-full pt-8 pb-16 px-72 ">
          <section className="w-full h-full flex py-10">
            <div className="w-72 flex flex-col justify-end">
              <p className="pb-7">
                We provide a 100% online experience that allows you to receive
                and compare multiple solar quotes first.
              </p>
              <div className=" flex">
                <FacebookRoundedIcon
                  className="hover:text-[#69D600] text-white mr-2 cursor-pointer transition-all duration-200 ease-in-out"
                  fontSize="large"
                />
                <InstagramIcon
                  className="hover:text-[#69D600] text-white mx-2 cursor-pointer transition-all duration-200 ease-in-out"
                  fontSize="large"
                />
                <TwitterIcon
                  className="hover:text-[#69D600] text-white mx-2 cursor-pointer transition-all duration-200 ease-in-out"
                  fontSize="large"
                />
                <YouTubeIcon
                  className="hover:text-[#69D600] text-white ml-2 cursor-pointer transition-all duration-200 ease-in-out"
                  fontSize="large"
                />
              </div>
            </div>
            <div className=" flex flex-col mx-9">
              <h3 className="text-[#69D600] py-3">EnergySage</h3>
              <div className="flex flex-col">
                <div className="">
                  <ArrowRightIcon />
                  <span>How it works</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>About us</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Press</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Careers</span>
                </div>
              </div>
            </div>
            <div className=" flex flex-col mx-9">
              <h3 className="text-[#69D600] py-3">EnergySage</h3>
              <div className=" flex flex-col">
                <div className="">
                  <ArrowRightIcon />
                  <span>Solar Calculator</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Learn About Solar</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Blog</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Solar Rebates</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Help Center</span>
                </div>
              </div>
            </div>
            <div className=" flex flex-col mx-9">
              <h3 className="text-[#69D600] py-3">EnergySage</h3>
              <div className=" flex flex-col">
                <div className="">
                  <ArrowRightIcon />
                  <span>Solar Companies</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Share Solar Tools</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Market Research</span>
                </div>
                <div className="">
                  <ArrowRightIcon />
                  <span>Refer a Friend</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-3">Get Competing Solar Quotes Online</h2>
              <input
                type="text"
                placeholder="Your zip code"
                className="w-80 h-12 rounded-md bg-headerBackground border border-headerBorder outline-none px-2 "
              />
              <button className="h-11 mt-3 font-bold rounded-md bg-buttonBackground cursor-pointer transitoin-all duration-200 ease-in-out ">
                <span>Get Quote</span>
              </button>
            </div>
          </section>
          <section className="w-full border border-secondaryBorder" />
          <div className="absolute  w-[177px] h-[177px] bg-buttonBackground rounded-full -bottom-20 -left-14" />
        </footer>
      </div>
    </>
  );
};

export default Footer;
