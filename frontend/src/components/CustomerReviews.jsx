"use client";
import React, { useEffect, useState } from "react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={
            i < rating
              ? "https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png" // Working filled star
              : "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg" // Working empty star
          }
          alt="Star"
          className="w-4 h-4"
          onError={(e) => (e.target.src = "https://via.placeholder.com/15")} // Backup star image
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ comment, time, imageSrc, rating, customerName }) => {
  return (
    <article className="pb-4 w-full border-b border-gray-200 last:border-0">
      <div className="flex flex-wrap items-center gap-4">
        {/* Customer Image */}
        <img
          src={imageSrc || "https://via.placeholder.com/58"}
          alt="Customer"
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => (e.target.src = "https://via.placeholder.com/58")}
        />

        {/* Customer Name & Rating */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-black">
            {customerName || "Anonymous"}
          </h3>
          <StarRating rating={rating} />
        </div>

        {/* Review Time */}
        <time className="text-xs text-gray-500">{time}</time>
      </div>

      {/* Review Comment */}
      <p className="mt-3 text-sm text-gray-600">{comment}</p>
    </article>
  );
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/reviews");
        const data = await response.json();
        setReviews(data?.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="px-4 py-6 w-full max-w-xl mx-auto">
      <article className="w-full bg-white rounded-xl shadow-md p-6">
        <header className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Customer Reviews</h2>
        </header>

        <div className="py-4 space-y-4">
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard
                key={index}
                comment={review.comment}
                time={new Date(review.createdAt).toLocaleString()}
                imageSrc={review.customer?.profileImage}
                customerName={review.customer?.name}
                rating={review.rating}
              />
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>

        <button className="w-full py-3 text-base font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 transition">
          See More Reviews
        </button>
      </article>
    </section>
  );
};

export default CustomerReviews;
