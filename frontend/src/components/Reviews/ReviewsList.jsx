"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { toast } from "react-hot-toast";



const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const role = currentUser.role;
  const visibleTabs = role === "CUSTOMER" ? ["Published"] : ["All Review","Published", "Deleted"];
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);
  
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews");
      const data = await response.json();
     
      if (data.data && data.data.length > 0) {
        const apiReviews = data.data.map((review) => ({
          reviewId: review.id,
          agentId:review.property.agent.id,
          id: `#${review.userId}`,
          name: review.user?.name || "Anonymous",
          joinDate: new Date(review.createdAt).toLocaleString(),
          review: review.comment,
          rating: review.rating,
          avatar: review.user?.avatar || DEFAULT_AVATAR,
          status: review.status || "Pending"
        }));
       
        setReviews(role === "AGENT"?apiReviews.filter((item)=>
        (
          item.agentId === currentUser.id
        )):apiReviews);
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
    if (activeTab === "All Review") {
      return review.status === "All_Review" || review.status === "Pending";
    }
    return review.status === activeTab;
  });

  return (
    <div className="bg-white rounded-xl">
      {/* Navigation Tabs */}
      <div className="flex px-8 py-0 border-b border-solid border-b-zinc-300 max-sm:overflow-x-auto max-sm:px-4 max-sm:py-0">
        {visibleTabs.map((tab) => (
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
