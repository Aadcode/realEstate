import React from "react";

const AgentCard = ({ agent }) => {
  const getButtonStyles = (color) => {
    const styles = {
      green: "bg-green-500 hover:bg-green-600 text-white",
      indigo: "bg-indigo-700 hover:bg-indigo-800 text-white",
      purple: "bg-purple-500 hover:bg-purple-600 text-white",
      sky: "bg-sky-500 hover:bg-sky-600 text-white",
      red: "bg-red-500 hover:bg-red-600 text-white",
      amber: "bg-amber-500 hover:bg-amber-600 text-white",
    };
    return styles[color] || "bg-indigo-700 hover:bg-indigo-800 text-white";
  };


  return (
    <div className="bg-white shadow-md rounded-xl p-5 transition-all hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="w-14 h-14 rounded-full border-2 border-gray-200 overflow-hidden shadow-sm">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60";
            }}
          />
        </div>

        {/* Agent Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <p
            className={`text-sm ${
              agent.role.includes("Senior")
                ? "text-indigo-600"
                : agent.role.includes("Junior")
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {agent.role}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600">{agent.description}</p>

      {/* Contact Info */}
      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium text-gray-500">Email: </span>
          {agent.email}
        </p>
        <p>
          <span className="font-medium text-gray-500">Phone: </span>
          {agent.phone || "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-500">Location: </span>
          {agent.location || "N/A"}
        </p>
      </div>

      {/* Message Button */}
      <button
        className={`mt-4 w-full py-2 rounded-lg font-medium transition-all ${getButtonStyles(
          agent.buttonColor
        )}`}
      >
        Write Message
      </button>
    </div>
  );
};

export default AgentCard;
