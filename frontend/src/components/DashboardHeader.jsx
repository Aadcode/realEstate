import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex flex-wrap items-start w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink items-start basis-0 min-w-[244px] pr-[1323px] max-md:max-w-full">
        <div className="max-w-full w-[244px]">
          <h1 className="w-full text-3xl font-semibold text-black whitespace-nowrap">
            Dashboard
          </h1>
          <p className="mt-2 w-full text-sm leading-6 text-zinc-500">
            Welcome to Omah Property 
          </p>
        </div>
      </div>
      <button className="px-5 pt-2.5 pb-3 text-base text-center text-indigo-700 whitespace-nowrap rounded-xl border border-solid bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10 max-md:px-5">
        Refresh
      </button>
    </header>
  );
};

export default DashboardHeader;
