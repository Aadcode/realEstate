"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState("dashboard");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserRole(userData?.role);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isActive = (path) => pathname === path;

  const menuItems = [
    {
      section: "dashboard",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/8e25e80718efe1a919cbd68099b72167368de90e?placeholderIfAbsent=true",
      title: "Dashboard",
      items: [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/reviews", label: "Reviews" },
        { path: "/customers", label: "Customers" }
      ]
    },
    {
      section: "agents",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/2bda6eb423efd913f3b419867929d97fe689db6b?placeholderIfAbsent=true",
      title: "Agents",
      items: [
        { path: "/agents", label: "All Agents" },
      ]
    },
    {
      section: "property",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/53f320a0e0e6dc706b2becd515691efaa0225c9c?placeholderIfAbsent=true",
      title: "Property",
      items: [
        { path: "/propertyDetails", label: "Property Details" },
        { path: "/addProperty", label: "Add Property" },
        { path:"/propertyList",label:"All Properties"}
      ]
    },
    // Only show App section if user is ADMIN
    ...(userRole === 'ADMIN' ? [{
      section: "App",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/53f320a0e0e6dc706b2becd515691efaa0225c9c?placeholderIfAbsent=true",
      title: "Admin",
      items: [
        { path: "/profile", label: "Admin Profile" },
        { path: "/addAgent", label: "Add Agent" },
      ]
    }] : [])
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/8e25e80718efe1a919cbd68099b72167368de90e?placeholderIfAbsent=true"
              className="w-5 h-5 object-contain filter brightness-0 invert"
              alt="Logo"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Omah Dashboard</h1>
            <p className="text-xs text-gray-500">Real Estate Management</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-3">
            <div
              className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                expandedSection === section.section 
                  ? "bg-indigo-50" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => toggleSection(section.section)}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                expandedSection === section.section 
                  ? "bg-indigo-100" 
                  : "bg-gray-100"
              }`}>
                <img
                  src={section.icon}
                  className={`w-4 h-4 object-contain transition-colors ${
                    expandedSection === section.section ? "opacity-100" : "opacity-70"
                  }`}
                  alt={section.title}
                />
              </div>
              <span className={`ml-3 text-sm font-medium transition-colors ${
                expandedSection === section.section 
                  ? "text-indigo-700" 
                  : "text-gray-700"
              }`}>
                {section.title}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                expandedSection === section.section
                  ? "max-h-96 opacity-100 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {section.items.map((item) => (
                <div
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center px-3 py-2.5 ml-8 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${
                    isActive(item.path) ? "bg-indigo-500" : "bg-gray-300"
                  }`} />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <p>© 2024 All Rights Reserved</p>
            <p className="mt-1">by DexignZone</p>
          </div>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
