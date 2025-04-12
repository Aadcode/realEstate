"use client";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import ReviewsList from "../../components/Reviews/ReviewsList";

const ReviewsPage = () => {
  const [activeStatus, setActiveStatus] = useState("All_Review");

  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with Status Tabs */}
        <div className="flex justify-between items-center px-8 py-4 bg-white rounded-lg max-sm:flex-col max-sm:gap-2.5">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-indigo-700">Reviews</span>
            <span className="text-sm text-indigo-700">/</span>
            <span className="text-sm text-gray-500">Customer</span>
          </div>
          
          {/* Status Tabs */}
          <div className="flex gap-4">
            {["All_Review", "Published", "Deleted"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeStatus === status
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <ReviewsList status={activeStatus} />
      </div>
    </Layout>
  );
};

export default ReviewsPage;
