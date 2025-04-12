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
        <div className="py-6 space-y-8">
          {/* Layer 1: Statistics and Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Statistics Cards */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <StatisticsCards />
            </div>
            
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <RevenueChart />
            </div>
          </div>
          
          {/* Layer 2: Overview and Reviews */}
          {/* Layer 2: Overview and Reviews */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Overview Chart */}
  <div className="bg-white rounded-xl p-6 shadow-md h-full">
    <UserDistributionChart />
  </div>

  {/* Customer Reviews */}
  <div className="bg-white rounded-xl p-6 shadow-md h-full">
    <CustomerReviews />
  </div>
</div>

{/* Layer 3: Map and Recent Properties */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Properties Map */}
  <div className="bg-white rounded-xl col-span-2 p-6 shadow-md h-full flex flex-col">
    <h2 className="text-xl font-semibold mb-6">Properties Location</h2>
    <div className="flex-1">
      <PropertiesMap />
    </div>
  </div>

  {/* Recent Properties */}
  <div className="bg-white rounded-xl p-6 shadow-md h-full flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Recent Properties</h2>
      <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
        View All
      </button>
    </div>
    <div className="flex-1 overflow-y-auto">
      <RecentProperty />
    </div>
  </div>
</div>

          
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;