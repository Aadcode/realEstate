"use client";
import React from "react";

const UserProfile = ({ name, role, avatarUrl }) => {
  return (
    <div className="flex items-center py-3 pl-4 h-full text-right">
      <div className="flex items-center self-stretch pl-5 my-auto rounded-xl">
        <div className="self-stretch pr-8 pl-8 my-auto max-md:px-5">
          <div className="w-full text-base font-semibold text-black">
            {name}
          </div>
          <div className="w-full text-xs leading-tight whitespace-nowrap text-neutral-600">
            {role}
          </div>
        </div>
        <img
          src={avatarUrl}
          className="object-contain shrink-0 self-stretch my-auto w-12 rounded-xl aspect-square"
          alt="User Avatar"
        />
      </div>
    </div>
  );
};

export default UserProfile;
