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
      <div className="max-w-[1744px] w-full px-4 sm:px-6 lg:px-8 mx-auto text-black">
        <DashboardHeader />

        {/* Main Content */}
        <div className="py-6 space-y-6">
          {/* Layer 1: Total Properties and Total Revenue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {/* Total Properties */}
            <StatisticsCards />

            {/* Revenue Chart */}
            <div className="rounded-xl bg-white p-4 shadow-md">
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
            <div className="rounded-xl bg-white p-6 shadow-md flex flex-col gap-4">
              <div className="flex justify-between items-center ">
                <h2 className="text-xl font-semibold text-black">Customer Reviews</h2>
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
          <div className="grid grid-cols-4 gap-4">
            {/* Properties Map */}
            <div className="rounded-xl bg-white p-4 shadow-md max-[1280px]:col-span-4 col-span-3">
              <PropertiesMap />
            </div>

            {/* Recent Properties */}
            <div className="rounded-xl bg-white p-4 shadow-md col-span-1 max-[1280px]:col-span-4">
              <RecentProperty />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;