"use client";
import React from "react";

const CustomerCard = ({
  name,
  customerId,
  email,
  phone,
  location,
  status,
  avatar
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-xl object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-500">Customer ID: {customerId}</p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {status}
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="w-24">Email:</span>
            <span className="text-gray-900">{email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="w-24">Phone:</span>
            <span className="text-gray-900">{phone}</span>
          </div>
          {/* <div className="flex items-center text-sm text-gray-500">
            <span className="w-24">Location:</span>
            <span className="text-gray-900">{location}</span>
          </div> */}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
