"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const fallbackReviews = [
  {
    id: "#C01234",
    name: "Robert Patilson",
    joinDate: "Join on 26/04/2020, 12:42 AM",
    review:
      "Friendly service Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.",
    rating: 4,
    avatarUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/27c0c7f7411252d6525fc088a3ff727da55b1a67",
  },
  {
    id: "#C01234",
    name: "Peter Parkur",
    joinDate: "Join on 26/04/2020, 12:42 AM",
    review:
      "Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Bakri strive to deliver a professional service and surpassed my expectations - they were not only help.",
    rating: 4,
    avatarUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ca96c9da452e853ef2c4554c01935321052d8b89",
  },
  {
    id: "#C01234",
    name: "Emilia Sigh",
    joinDate: "Join on 26/04/2020, 12:42 AM",
    review:
      "Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Bakri strive to deliver a professional service and surpassed my expectations - they were not only help.",
    rating: 4,
    avatarUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/35eef414fdc4684988b1023c971fbe2b694ab52a",
  },
];

const DEFAULT_AVATAR ="https://cdn.builder.io/api/v1/image/assets/TEMP/35eef414fdc4684988b1023c971fbe2b694ab52a";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All_Review");

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews");
      const data = await response.json();
     
      if (data.statusCode === 200 && data.data.length > 0) {
        const apiReviews = data.data.map((review) => ({
          reviewId: review.id,
          id: `#${review.customerId}`,
          name: review.customer.name,
          joinDate: new Date(review.createdAt).toLocaleString(),
          review: review.comment,
          rating: review.rating,
          avatarUrl: review.customer.profileImage || DEFAULT_AVATAR,
          status: review.status
        }));
        console.log("API reviews:", apiReviews);
        setReviews(apiReviews);
      } else {
        setReviews(fallbackReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (reviewId, newStatus) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.reviewId === reviewId 
          ? { ...review, status: newStatus }
          : review
      )
    );
  };

  const filteredReviews = reviews.filter(review => {
    switch (activeTab) {
      case "All_Review":
        return review.status === "All_Review";
      case "Published":
        return review.status === "Published";
      case "Deleted":
        return review.status === "Deleted";
      default:
        return true;
    }
  });

  return (
    <div className="bg-white rounded-xl">
      {/* Navigation Tabs */}
      <div className="flex px-8 py-0 border-b border-solid border-b-zinc-300 max-sm:overflow-x-auto max-sm:px-4 max-sm:py-0">
        {["All_Review", "Published", "Deleted"].map((tab) => (
          <div 
            key={tab} 
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-4 font-semibold cursor-pointer max-sm:p-4 ${
              activeTab === tab ? "text-indigo-700 border-b-2 border-indigo-700" : "text-zinc-400"
            }`}
          >
            {tab.replace('_', ' ')}
          </div>
        ))}
      </div>

      {/* Review Content */}
      <div className="p-6">
        {loading ? (
          <p>Loading reviews...</p>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <ReviewCard 
              key={review.reviewId} 
              {...review} 
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews found for this status</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
