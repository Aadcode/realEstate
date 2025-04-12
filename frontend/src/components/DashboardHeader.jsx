import React, { useState } from "react";

const DashboardHeader = () => {
  // State to simulate data refresh
  const [refreshing, setRefreshing] = useState(false);

  // Handle refresh action
  const handleRefresh = () => {
    setRefreshing(true);

    // Simulate an API call or data reload
    setTimeout(() => {
      setRefreshing(false);
      console.log("Data refreshed!");
      // You can call your data fetching or update logic here
    }, 2000); // Simulate a 2-second delay
  };

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
      <button
        onClick={handleRefresh}
        className="px-5 pt-2.5 pb-3 text-white text-center whitespace-nowrap rounded-xl border border-solid bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10 max-md:px-5"
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </header>
  );
};

export default DashboardHeader;
