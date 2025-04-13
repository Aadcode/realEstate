"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react"; // Import useMemo

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Initialize expandedSection to null initially, let useEffect determine it.
  const [expandedSection, setExpandedSection] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Memoize menuItems based on userRole
  const menuItems = useMemo(() => {
    return [
      {
        section: "dashboard",
        icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/8e25e80718efe1a919cbd68099b72167368de90e",
        title: "Dashboard",
        items: [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/reviews", label: "Reviews" },
          // { path: "/customers", label: "Customers" },
        ],
      },
      {
        section: "agents",
        icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/2bda6eb423efd913f3b419867929d97fe689db6b",
        title: "Agents",
        items: [{ path: "/agents", label: "All Agents" }],
      },
      {
        section: "property",
        icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/53f320a0e0e6dc706b2becd515691efaa0225c9c",
        title: "Property",
        items: [
          { path: "/propertyDetails", label: "Property Details" },
          { path: "/addProperty", label: "Add Property" },
          { path: "/propertyList", label: "All Properties" },
        ],
      },
      // Conditionally add Admin section based on userRole
      ...(userRole === "ADMIN"
        ? [
            {
              section: "App", // Consider renaming section for clarity, e.g., "admin"
              icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/53f320a0e0e6dc706b2becd515691efaa0225c9c", // Maybe use a different icon for admin?
              title: "Admin",
              items: [
                { path: "/profile", label: "Admin Profile" },
                { path: "/addAgent", label: "Add Agent" },
              ],
            },
          ]
        : []),
    ];
  }, [userRole]); // ✅ Recalculate only when userRole changes

  useEffect(() => {
    // Fetch user role - runs only on client
    let role = null;
    try {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        role = userData?.role;
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      // Handle error appropriately, maybe clear storage or set default role
    }
    setUserRole(role);

    // Find the section corresponding to the current pathname
    const currentSectionData = menuItems.find((section) =>
      section.items.some((item) => item.path === pathname)
    );
    
    // Expand the section if found
    if (currentSectionData) {
        // Only set if it's different or not already set - prevents unnecessary state updates
        if (expandedSection !== currentSectionData.section) {
             setExpandedSection(currentSectionData.section);
        }
    } else if (pathname === '/') { // Example: Default to dashboard if on root path and no match
        setExpandedSection("dashboard");
    }
    // If no section matches the current path, the `expandedSection` will remain as it was
    // (either null or the last manually toggled section), unless specific logic is added.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuItems]); // ✅ Re-run when pathname OR menuItems structure changes

  const toggleSection = (section) => {
    // If clicking the already expanded section, collapse it (set to null)
    // Otherwise, expand the clicked section
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNavigation = (path) => {
    router.push(path);
    // Optional: Automatically expand the section containing the navigated item
    // const targetSection = menuItems.find(section => section.items.some(item => item.path === path))?.section;
    // if (targetSection) {
    //   setExpandedSection(targetSection);
    // }
    // Note: The useEffect already handles expanding based on pathname change,
    // so explicitly setting it here might be redundant unless immediate feedback is needed.
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/8e25e80718efe1a919cbd68099b72167368de90e"
              className="w-5 h-5 object-contain filter brightness-0 invert"
              alt="Logo"
              onError={(e) => (e.target.style.display = "none")}
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
        {menuItems.map((section) => {
          // Determine if the section header should be highlighted
          const isSectionActive = section.items.some((item) => isActive(item.path));
          // Determine if the section content should be expanded
          const isExpanded = expandedSection === section.section;

          return (
            <div key={section.section} className="mb-3">
              <div
                className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  // Highlight if explicitly expanded OR contains the active item
                  isExpanded || isSectionActive ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleSection(section.section)}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                    isExpanded || isSectionActive ? "bg-indigo-100" : "bg-gray-100"
                  }`}
                >
                  {section.icon && (
                    <img
                      src={section.icon}
                      className={`w-4 h-4 object-contain transition-opacity ${ // Changed transition property
                        isExpanded || isSectionActive ? "opacity-100" : "opacity-70"
                      }`}
                      alt={section.title}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium transition-colors ${
                    isExpanded || isSectionActive ? "text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {section.title}
                </span>
                 {/* Optional: Add chevron icon for visual indication */}
                 <svg 
                    className={`w-4 h-4 ml-auto text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
              </div>
              <div
                // Use the isExpanded state to control visibility
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                {section.items.map((item) => {
                    const itemIsActive = isActive(item.path);
                    return (
                  <div
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-3 py-2.5 ml-8 rounded-lg cursor-pointer transition-all duration-200 ${
                      itemIsActive
                        ? "bg-indigo-100 text-indigo-700 font-medium border-l-4 border-indigo-500 pl-2" // Adjust padding left for border
                        : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent pl-3" // Keep alignment consistent
                    }`}
                    style={{ paddingLeft: itemIsActive ? '0.5rem' : '0.75rem' }} // Explicit padding control
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${
                        itemIsActive ? "bg-indigo-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">{item.label}</span>
                    {itemIsActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    )}
                  </div>
                )})}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        {/* ... (footer content remains the same) ... */}
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