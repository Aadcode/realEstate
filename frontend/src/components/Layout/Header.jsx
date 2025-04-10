"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("agentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name,
        role: parsedUser.role,
      });
    }
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-0 bg-white h-[72px] shadow-sm max-sm:flex-col max-sm:p-4 max-sm:h-auto">
      {/* Search Input */}
      <div className="flex-1 max-w-[400px] max-sm:mb-4 max-sm:w-full max-sm:max-w-full">
        <div className="flex items-center overflow-hidden rounded-full bg-neutral-100 shadow-inner">
          <input
            type="text"
            placeholder="Search Here"
            className="flex-1 px-5 py-2.5 text-base font-light text-neutral-600 placeholder:text-neutral-400 border-none bg-transparent outline-none"
          />
          <button className="flex items-center justify-center px-5 py-3 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200">
            <i className="ti ti-search text-xl text-indigo-700" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
        {["bell", "message", "shopping-cart"].map((icon, index) => (
          <div
            key={index}
            className="relative p-3 rounded-xl cursor-pointer bg-neutral-100 hover:bg-neutral-200 transition duration-150"
          >
            <i className={`ti ti-${icon} text-xl text-gray-700`} />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
          </div>
        ))}

        {/* User Info */}
        <div className="flex gap-4 items-center pl-5 border-l border-zinc-200 max-sm:border-none">
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">
              {user.name || "Guest"}
            </div>
            <div className="text-xs text-neutral-500">{user.role || "User"}</div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf3b9227ce103ede32e1755f81ee85a77cff7bcc"
            alt="Profile"
            className="w-12 h-12 rounded-xl shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
