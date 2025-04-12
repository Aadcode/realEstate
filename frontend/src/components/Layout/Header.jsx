"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserProfile from "./UserProfile";
import { BiBell, BiMessageDetail, BiGift, BiSearch } from "react-icons/bi";

const Header = () => {
  const [user, setUser] = useState({ name: "", role: "", avatar: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name,
        role: parsedUser.role,
        avatar: parsedUser.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60"
      });
    }
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-0 bg-white h-[72px] shadow-sm max-sm:flex-col max-sm:p-4 max-sm:h-auto">
      <div className="flex items-center gap-6 max-sm:w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/Background.png"
            alt="Company Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-[400px] max-sm:mb-4 max-sm:w-full max-sm:max-w-full">
          <div className="flex items-center overflow-hidden rounded-full bg-neutral-100 shadow-inner">
            <input
              type="text"
              placeholder="Search Here"
              className="flex-1 px-5 py-2.5 text-base font-light text-neutral-600 placeholder:text-neutral-400 border-none bg-transparent outline-none"
            />
            <button className="flex items-center justify-center px-5 py-3 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200">
              <BiSearch className="text-xl text-indigo-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
        {[
          { icon: BiBell, name: 'notifications' },
          { icon: BiMessageDetail, name: 'messages' },
          { icon: BiGift, name: 'gift' }
        ].map(({ icon: Icon, name }, index) => (
          <div
            key={index}
            className="relative p-3 rounded-xl cursor-pointer bg-neutral-100 hover:bg-neutral-200 transition duration-150"
          >
            <Icon className="text-xl text-gray-700" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
          </div>
        ))}

        {/* User Profile */}
        <UserProfile 
          name={user.name || "Guest"} 
          role={user.role || "User"} 
          avatarUrl={user.avatar} 
        />
      </div>
    </div>
  );
};

export default Header;
