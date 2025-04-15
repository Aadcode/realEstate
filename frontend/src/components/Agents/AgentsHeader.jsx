"use client";
import { Judson } from "next/font/google";
import React from "react";

const AgentsHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const role = currentUser.role

  return (
    <div className="flex flex-col justify-center pb-8 w-full min-h-[115px]">
      <div className="flex flex-wrap items-center justify-between px-6 py-4 w-full bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-start">
          <div className="w-full">
            <div className="w-full text-xl font-semibold text-indigo-700">
              Agent Card View
            </div>
            <div className="flex flex-wrap mt-1 w-full text-sm">
              <div className="font-semibold text-indigo-700">
                <div>All Agents</div>
              </div>
              <div className="flex items-start pl-2 h-full">
                <div className="flex-1 shrink pr-2 text-indigo-700 whitespace-nowrap basis-0">
                  /
                </div>
                <div className="text-gray-500">All agents listing</div>
              </div>
            </div>
          </div>
        </div>
        {role === 'ADMIN' && (
          <div className="px-5 py-2.5 text-base text-center text-white rounded-xl border border-solid bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10 hover:bg-opacity-20 transition-colors cursor-pointer">
            + Add Agent
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsHeader;
