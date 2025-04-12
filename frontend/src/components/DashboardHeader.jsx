import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex flex-wrap justify-between items-center w-full max-md:max-w-full">
      <div className="flex flex-col items-start md:max-w-full">
        <h1 className="w-full text-3xl font-semibold text-black whitespace-nowrap">
          Dashboard
        </h1>
        <p className="mt-2 w-full text-sm leading-6 text-zinc-500">
          Welcome to Omah Property
        </p>
      </div>
      <button className="px-5 py-2 text-base text-center font-medium text-indigo-500 whitespace-nowrap rounded-xl border border-solid bg-indigo-100 bg-opacity-10 border-indigo-400 border-opacity-10 max-md:px-5">
        Refresh
      </button>
    </header>
  );
};

export default DashboardHeader;
