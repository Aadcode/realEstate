"use client";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Header />
      <div className="flex flex-1 max-md:flex-col">
        <Sidebar />
        <div className="flex-1 px-6 py-6 overflow-auto max-md:px-4 flex flex-col gap-6">
          {children}
        </div>
      </div>
      <footer className="mt-auto p-4 text-sm text-center bg-neutral-100 text-neutral-400">
        <span>Copyright © Designed &amp; Developed by</span>
        <a href="#" className="text-indigo-700 no-underline">
          {" "}
          DexignZone{" "}
        </a>
        <span>2024</span>
      </footer>
    </div>
  );
};

export default Layout;