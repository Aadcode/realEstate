import React, { useState } from "react";

const PropertyFeatures = ({
  features: propFeatures = [],
  selectedFeatures = [],
  onToggle,
  labelStyle = "block text-sm font-medium text-white mb-2",
  allowCustomFeatures = true,
}) => {
  // Hardcoded default features
  const defaultFeatures = [
    "Swimming Pool",
    "Gym",
    "Garden",
    "Parking",
    "Balcony",
    "Security",
    "Fireplace",
    "Central AC",
    "Laundry",
    "Storage"
  ];

  // State for custom feature input
  const [customFeature, setCustomFeature] = useState("");
  
  // Combine default features with props and maintain in state
  const [localFeatures, setLocalFeatures] = useState([...defaultFeatures, ...propFeatures]);

  // Handle adding a custom feature
  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !localFeatures.includes(customFeature)) {
      const newFeatures = [...localFeatures, customFeature];
      setLocalFeatures(newFeatures);
      onToggle(customFeature); // Automatically select the new feature
      setCustomFeature("");
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg text-white">
      <label className={labelStyle}>Additional Features</label>
      
      {/* Features selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {localFeatures.map((feature) => (
          <label
            key={feature}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm cursor-pointer transition-colors ${
              selectedFeatures.includes(feature)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2 opacity-0 absolute"
              checked={selectedFeatures.includes(feature)}
              onChange={() => onToggle(feature)}
            />
            {feature}
          </label>
        ))}
      </div>

      {/* Custom feature input */}
      {allowCustomFeatures && (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="Add custom feature"
            className="flex-1 px-3 py-2 bg-white border border-gray-600 rounded-md shadow-sm text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
          />
          <button
            onClick={handleAddCustomFeature}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!customFeature.trim()}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFeatures;