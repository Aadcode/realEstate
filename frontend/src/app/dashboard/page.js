"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout/Layout";
import DashboardHeader from "../../components/DashboardHeader";
import StatisticsCards from "../../components/StatisticsCards";
import RevenueChart from "../../components/RevenueChart";
import PropertiesMap from "../../components/PropertiesMap";
import CustomerReviews from "../../components/CustomerReviews";
import RecentProperty from "../../components/RecentProperty";
import SalesRentChart from "../../components/SalesRentChart";
import UserDistributionChart from "../../components/PieChart";

const Dashboard = () => {
  const router = useRouter();

  const handleViewAllReviews = () => {
    router.push("/reviews");
  };

  return (
    <Layout>
      <div className="max-w-[1744px] w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <DashboardHeader />
        
        {/* Main Content */}
        <div className="py-6 space-y-6">
          {/* Layer 1: Total Properties and Total Revenue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Total Properties */}
            <StatisticsCards />
            
            {/* Revenue Chart */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-2">Revenue Overview</h2>
                  <div className="text-sm text-gray-500">Last year $563,443</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">Month</button>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">Week</button>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">2023</button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">2024</button>
                  </div>
                </div>
              </div>
              <RevenueChart />
            </div>
          </div>
          
          {/* Layer 2: Overview Pie Chart and Customer Reviews */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Overview Pie Chart */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-6">Property Overview</h2>
              <UserDistributionChart />
            </div>
            
            {/* Customer Reviews */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <button 
                  onClick={handleViewAllReviews}
                  className="text-blue-600 text-sm hover:text-blue-700 transition-colors"
                >
                  View All
                </button>
              </div>
              <CustomerReviews />
            </div>
          </div>
          
          {/* Layer 3: Properties Map and Recent Properties */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Properties Map */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-6">Properties Location</h2>
              <PropertiesMap />
            </div>
            
            {/* Recent Properties */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Properties</h2>
                <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">View All</button>
              </div>
              <RecentProperty />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;