"use client";
import React from "react";

const NotificationIcon = ({ imageUrl }) => {
  return (
    <div className="flex items-center py-3.5 pl-4 h-full w-[60px]">
      <div className="relative self-stretch p-3 my-auto w-11 h-11 rounded-xl bg-neutral-100">
        <img
          src={imageUrl}
          className="object-contain z-0 w-full aspect-square"
          alt="Notification"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/00eeba955deb21ba78588c71f5c21e4b55fe207c?placeholderIfAbsent=true"
          className="object-contain absolute top-0.5 right-0.5 z-0 rounded-lg aspect-square h-[13px] w-[13px]"
          alt="Notification Badge"
        />
      </div>
    </div>
  );
};

export default NotificationIcon;
