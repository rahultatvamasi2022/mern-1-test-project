import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[100px] px-[300px] text-[#5A5968] text-md font-normal">
      <div className="w-full h-full flex items-center justify-end">
        <div className="pr-10">
          <span>Privacy Policy</span>
        </div>
        <div className="px-10 border-x border-x-[#5A5968]">
          <span>Security</span>
        </div>
        <div className="px-10 border-r border-r-[#5A5968]">
          <span>Cookie Policy</span>
        </div>
        <div className="pl-10">
          <span>Terms and Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
