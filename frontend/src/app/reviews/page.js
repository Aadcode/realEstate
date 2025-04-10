"use client";
import React from "react";
import Layout from "../../components/Layout/Layout";
import ReviewsList from "../../components/Reviews/ReviewsList";

const ReviewsPage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center px-8 py-4 mb-8 bg-white rounded-lg max-sm:flex-col max-sm:gap-2.5">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-indigo-700">Reviews</span>
          <span className="text-sm text-indigo-700">/</span>
          <span className="text-sm text-gray-500">Customer</span>
        </div>
        <button className="px-5 py-2.5 text-indigo-700 rounded-xl border border-solid cursor-pointer bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10 max-sm:w-full">
          Refresh
        </button>
      </div>
      <ReviewsList />
    </Layout>
  );
};

export default ReviewsPage;
