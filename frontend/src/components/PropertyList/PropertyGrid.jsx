"use client";
import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ properties }) => {
  return (
    <div className="mt-4 max-md:max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="w-full">
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
