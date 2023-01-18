import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <main className="w-full flex flex-col">
        <section className="w-full h-[100px] flex items-center text-[18px] font-medium px-[50px] md:px-[100px] lg:px-[120px] xl:px-[204px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "w-56 h-full flex items-center pl-4 border-b-4 border-b-primaryBorder rounded-b"
                : "w-56 h-full flex  items-center pl-4"
            }
          >
            {({ isActive }) => (
              <div className="">
                <h2 className={isActive ? "text-[#69D600]" : ""}>Dashboard</h2>
                <p className="text-[14px] text-secondary font-normal">
                  <span>Summary & History</span>
                </p>
              </div>
            )}
          </NavLink>
          <div className="w-0 h-[40px] border  border-secondaryBorder" />
          <NavLink
            to="/project"
            className={({ isActive }) =>
              isActive
                ? "w-56 h-full flex items-center pl-6 border-b-4 border-b-primaryBorder rounded-b"
                : "w-56 h-full flex items-center pl-6"
            }
          >
            {({ isActive }) => (
              <div className="">
                <h2 className={isActive ? "text-[#69D600]" : ""}>Project</h2>
                <p className="text-[14px] text-secondary font-normal">
                  <span>Inquiries and Projects</span>
                </p>
              </div>
            )}
          </NavLink>
          <div className="w-0 h-[40px] border  border-secondaryBorder" />
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "w-56 h-full flex items-center pl-6 border-b-4 border-b-primaryBorder rounded-b"
                : "w-56 h-full flex items-center pl-6"
            }
          >
            {({ isActive }) => (
              <div className="">
                <h2 className={isActive ? "text-[#69D600]" : ""}>Messages</h2>
                <p className="text-[14px] text-secondary font-normal">
                  <span>Chat box</span>
                </p>
              </div>
            )}
          </NavLink>
          <div className="w-0 h-[40px] border  border-secondaryBorder" />
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "w-56 h-full flex items-center pl-6 border-b-4 border-b-primaryBorder rounded-b"
                : "w-56 h-full flex items-center pl-6"
            }
          >
            {({ isActive }) => (
              <div className="">
                <h2 className={isActive ? "text-[#69D600]" : ""}>Profile</h2>
                <p className="text-[14px] text-secondary font-normal">
                  <span>Account Information</span>
                </p>
              </div>
            )}
          </NavLink>
        </section>
        <Outlet />
      </main>
    </>
  );
};

export default Main;
