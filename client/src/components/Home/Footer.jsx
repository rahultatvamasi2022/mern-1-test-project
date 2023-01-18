import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[100px] px-[50px] md:px-[100px] lg:px-[200px] xl:px-[300px] text-[#5A5968] text-md font-normal">
      <div className="w-full h-full flex items-center justify-end">
        <div className="pr-3 md:pr-5 lg:pr-8 xl:pr-10">
          <span>Privacy Policy</span>
        </div>
        <div className="px-3 md:px-5 lg:px-8 xl:px-10 border-x border-x-[#5A5968]">
          <span>Security</span>
        </div>
        <div className="px-3 md:px-5 lg:px-8 xl:px-10 border-r border-r-[#5A5968]">
          <span>Cookie Policy</span>
        </div>
        <div className="pl-3 md:pl-5 lg:pl-8 xl:pl-10">
          <span>Terms and Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
