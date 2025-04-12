"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { toast } from "react-hot-toast";

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

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All_Review");

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews");
      const data = await response.json();
     
      if (data.data && data.data.length > 0) {
        const apiReviews = data.data.map((review) => ({
          reviewId: review.id,
          id: `#${review.userId}`,
          name: review.user?.name || "Anonymous",
          joinDate: new Date(review.createdAt).toLocaleString(),
          review: review.comment,
          rating: review.rating,
          avatar: review.user?.avatar || DEFAULT_AVATAR,
          status: review.status || "Pending"
        }));
        setReviews(apiReviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
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

  const handleStatusChange = async (reviewId, action) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          action: action
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update review status');
      }

      // Update the local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.reviewId === reviewId 
            ? { 
                ...review, 
                status: action === 'accept' ? 'Published' : 'Deleted' 
              }
            : review
        )
      );

      toast.success(`Review ${action === 'accept' ? 'published' : 'deleted'} successfully`);
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error(error.message || 'An error occurred while updating the review');
      throw error; // Re-throw to be caught by ReviewCard
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (activeTab === "All_Review") {
      return review.status === "All_Review" || review.status === "Pending";
    }
    return review.status === activeTab;
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
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard 
              key={review.reviewId} 
              {...review} 
              onStatusChange={handleStatusChange}
              showActions={review.status === "All_Review" || review.status === "Pending"}
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
