"use client";
import React, { useState } from "react";

const PropertyFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    propertyType: "",
    category: "",
    priceRange: [0, 1000000],
    areaRange: [0, 5000]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRangeChange = (e, rangeType) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      [rangeType]: [value, prev[rangeType][1]]
    }));
  };

  const handleSearch = () => {
    console.log("Current filters:", filters);
    // Here you can add the actual filtering logic later
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Property</span>
            <span className="text-blue-600 font-bold">/</span>
            <span className="font-semibold text-blue-600">Property List</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Keyword</label>
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              placeholder="Enter your keyword..."
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
            >
              <option value="" className="text-gray-400">Select Location</option>
              <option value="mumbai" className="text-gray-800">Mumbai</option>
              <option value="delhi" className="text-gray-800">Delhi</option>
              <option value="bangalore" className="text-gray-800">Bangalore</option>
              <option value="hyderabad" className="text-gray-800">Hyderabad</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Property Type</label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
            >
              <option value="" className="text-gray-400">Select Type</option>
              <option value="apartment" className="text-gray-800">Apartment</option>
              <option value="house" className="text-gray-800">House</option>
              <option value="villa" className="text-gray-800">Villa</option>
              <option value="land" className="text-gray-800">Land</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
            >
              <option value="" className="text-gray-400">Select Category</option>
              <option value="sale" className="text-gray-800">For Sale</option>
              <option value="rent" className="text-gray-800">For Rent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">Price Range</label>
              <span className="text-sm font-medium text-blue-600">
                ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
              </span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                name="priceMin"
                min="0"
                max="1000000"
                step="10000"
                value={filters.priceRange[0]}
                onChange={(e) => handleRangeChange(e, 'priceRange')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
              />
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">Area Range</label>
              <span className="text-sm font-medium text-blue-600">
                {filters.areaRange[0]} - {filters.areaRange[1]} sqft
              </span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                name="areaMin"
                min="0"
                max="5000"
                step="100"
                value={filters.areaRange[0]}
                onChange={(e) => handleRangeChange(e, 'areaRange')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
