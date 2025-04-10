import React from "react";

const PropertyHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-wrap justify-between items-start">
      <div className="flex flex-col">
        <h1 className="text-indigo-600 text-xl font-semibold">
          Property Details
        </h1>
        <div className="flex items-center mt-2 text-sm">
          <span className="text-indigo-600 font-semibold">Property</span>
          <span className="mx-2 text-indigo-600">/</span>
          <span className="text-gray-500">98AB Alexander Court New York</span>
        </div>
      </div>

      <div className="flex gap-4 text-sm mt-4 md:mt-0">
        <button className="px-5 py-2.5 bg-[#FF6746] text-white rounded-xl hover:bg-[#ff5a39] transition-colors">
          Update Info
        </button>
        <button className="px-5 py-2.5 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;
