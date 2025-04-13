"use client";
import React, { useEffect, useState, useRef } from "react"; // Import useRef
import Image from "next/image";
// Removed UserProfile import
import { BiBell, BiMessageDetail, BiGift, BiSearch, BiLogOut } from "react-icons/bi"; // Import BiLogOut
import { redirect } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState({ name: "", role: "", avatar: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown area

  // Fetch user data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            name: parsedUser.name || "",
            role: parsedUser.role || "",
            avatar: parsedUser.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60"
          });
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          setUser({ name: "", role: "", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60" });
        }
      } else {
         setUser({ name: "", role: "", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60" });
      }
    }
  }, []);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    redirect("/login")
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click is outside the ref element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount or when dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Dependency array includes isDropdownOpen

  return (
    <div className="flex justify-between items-center px-8 py-0 bg-white h-[72px] shadow-sm max-sm:flex-col max-sm:p-4 max-sm:h-auto">
      {/* Left Section: Logo & Search */}
      <div className="flex items-center gap-6 max-sm:w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          {"/Background.png" ? (
            <Image
              src="/Background.png" // Ensure this path is correct
              alt="Company Logo"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
          ) : null}
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

      {/* Right Section: Icons & User Profile with Dropdown */}
      <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
        {/* Icons */}
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
             {/* Optional: Conditional Notification Dots */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </div>
        ))}

        {/* User Profile Section with Integrated Dropdown */}
        <div className="relative" ref={dropdownRef}> {/* Add relative positioning and ref */}
          {/* Clickable User Info Area */}
          <div
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-neutral-100 transition duration-150"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={"User Avatar"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : null}
            <div className="text-sm max-sm:hidden"> {/* Hide text on small screens if needed */}
              <div className="font-semibold text-gray-800">{user.name || "Guest"}</div>
              <div className="text-xs text-gray-500">{user.role || "User"}</div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 py-1 border border-neutral-200">
              {/* User Info inside Dropdown (Optional) */}
              <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                 <div className="font-medium text-gray-800">{user.name || "Guest"}</div>
                 <div className="text-xs text-gray-500">{user.role || "User"}</div>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition duration-150"
              >
                <BiLogOut className="text-base" /> {/* Logout Icon */}
                Logout
              </button>
              {/* Add other items like Profile Link here if needed */}
              {/* <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a> */}
            </div>
          )}
        </div> {/* End User Profile Section */}
      </div> {/* End Right Section */}
    </div> // End Header Container
  );
};

export default Header;