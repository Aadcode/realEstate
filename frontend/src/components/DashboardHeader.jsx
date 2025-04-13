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
      <div className="flex flex-col flex-1 items-start">
        <h1 className="w-full text-3xl font-semibold text-black whitespace-nowrap">
          Dashboard
        </h1>
        <p className="w-full text-sm leading-6 text-zinc-500">
          Welcome to Omah Property
        </p>
      </div>
      <button
        onClick={handleRefresh}
        className="px-5 py-3 text-indigo-600 text-center whitespace-nowrap rounded-xl border border-solid bg-indigo-100 bg-opacity-10 border-indigo-400 border-opacity-10"
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </header>
  );
};

export default DashboardHeader;
