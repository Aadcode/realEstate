import React from "react";

const Footer = () => {
  return (
    <footer className="pt-3.5 pr-4 pb-4 pl-48 mt-5 w-full text-sm leading-6 text-center bg-neutral-100 text-neutral-400 max-md:pl-5 max-md:max-w-full">
      <div className="flex flex-wrap justify-center items-start w-full px-[660px] max-md:px-5 max-md:max-w-full">
        <p>Copyright © Designed & Developed by</p>
        <a href="#" className="pr-1 text-indigo-700 whitespace-nowrap">
          DexignZone
        </a>
        <p>2024</p>
      </div>
    </footer>
  );
};

export default Footer;
