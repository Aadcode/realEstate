import React from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const ReviewCard = ({ id, name, joinDate, review, rating, avatar, status, reviewId, onStatusChange, showActions }) => {
  const handleAction = async (action) => {
    try {
      await onStatusChange(reviewId, action);
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error(error.response?.data?.message || "Failed to update review status");
    }
  };

  return (
    <div className="flex gap-4 p-6 border-b border-solid border-b-zinc-100 max-md:flex-col">
      <img
        src={avatar}
        alt={name}
        className="rounded-xl h-[90px] w-[90px] max-md:h-[60px] max-md:w-[60px]"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60";
        }}
      />
      <div className="flex-1 max-sm:p-0">
        <div className="mb-4">
          <div className="text-sm text-indigo-700">{id}</div>
          <div className="mx-0 my-1 text-lg font-semibold text-black">
            {name}
          </div>
          <div className="text-sm text-zinc-500">{joinDate}</div>
        </div>
        <div className="mb-4 text-sm leading-5 text-gray-700">{review}</div>
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-4 items-start">
            <div className="px-2 py-1 text-xs font-semibold text-indigo-700 rounded-xl bg-slate-200">
              Current Status: {status || 'No status'}
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < rating
                      ? "fill-indigo-700 text-indigo-700"
                      : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {showActions && (
            <div className="flex gap-3 max-md:justify-between max-md:w-full max-sm:flex-col max-sm:gap-2.5">
              <button 
                onClick={() => handleAction('accept')}
                className="px-5 py-2.5 text-base text-green-500 rounded-xl border border-green-500 border-solid cursor-pointer max-sm:w-full hover:bg-green-50"
              >
                Approve
              </button>
              <button 
                onClick={() => handleAction('reject')}
                className="px-5 py-2.5 text-base text-red-500 rounded-xl border border-red-500 border-solid cursor-pointer max-sm:w-full hover:bg-red-50"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
