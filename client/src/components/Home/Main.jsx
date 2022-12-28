import React from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import Friend from "../Friend";

const Main = () => {
  return (
    <main className="w-full flex flex-col">
      <section className="w-full h-[100px] flex items-center text-[18px] font-medium px-[304px]">
        <div className="w-52 h-full flex items-center pl-4 ">
          <div className="">
            <h2>Dashboard</h2>
            <p className="text-[14px] text-secondary font-normal">
              <span>Summary & History</span>
            </p>
          </div>
        </div>
        <div className="w-0 h-[40px] border  border-secondaryBorder" />
        <div className="w-56 h-full flex items-center pl-6">
          <div className="">
            <h2>Project</h2>
            <p className="text-[14px] text-secondary font-normal">
              <span>Inquiries and Projects</span>
            </p>
          </div>
        </div>
        <div className="w-0 h-[40px] border  border-secondaryBorder" />
        <div className="w-44 h-full flex items-center pl-6 border-b-2 border-b-primaryBorder">
          <div className="">
            <h2 className="text-[#69D600]">Messages</h2>
            <p className="text-[14px] text-secondary font-normal">
              <span>Chat box</span>
            </p>
          </div>
        </div>
        <div className="w-0 h-[40px] border  border-secondaryBorder" />
        <div className="w-60 h-full flex items-center pl-6">
          <div className="">
            <h2>Profile</h2>
            <p className="text-[14px] text-secondary font-normal">
              <span>Account Information</span>
            </p>
          </div>
        </div>
      </section>
      <section className="w-full flex px-[304px] pt-[61px] pb-[76px] bg-[#FAFBFC]">
        <div className="w-full h-[666px] flex rounded-[20px] overflow-hidden">
          <nav className="w-[405px] h-full py-7 px-8 bg-navBackground">
            <div className="w-full h-[52px]  text-md font-normal rounded-md overflow-hidden">
              <form className="w-full h-full flex items-center bg-white">
                <span className="mx-4">
                  <SearchRoundedIcon
                    fontSize="small"
                    style={{ color: "#DADADA" }}
                  />
                </span>
                <input
                  className="w-full h-full text-primary placeholder:text-[#DADADA] outline-none"
                  type="text"
                  placeholder="Search by username or email"
                />
              </form>
            </div>
            <div className="">
              <Friend />
              <Friend />
              <Friend />
              <Friend />
              <Friend />
            </div>
          </nav>
          <section className="w-full h-full bg-white">Main</section>
        </div>
      </section>
    </main>
  );
};

export default Main;
