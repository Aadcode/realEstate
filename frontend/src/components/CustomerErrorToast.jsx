// Define this component in your project, maybe in a 'components' folder

import React from 'react';
import { X } from 'lucide-react'; // Using lucide-react for the close icon

function CustomErrorToast({ closeToast, title, message, onTryAgain }) {

  const handleTryAgainClick = () => {
    if (onTryAgain) {
      onTryAgain(); // Execute the provided try again logic
    }
    // Optionally close the toast after clicking 'Try again'
    // closeToast();
  };

  return (
    // Container for the custom content
    // Using Tailwind classes for styling - adjust as needed
    <div className="flex flex-col w-full">
      {/* Top section: Title and optional custom close button */}
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold text-base text-gray-800">{title || 'Oh Snap!'}</h4>
        {/* Use react-toastify's default close button OR render a custom one */}
        {/* <button onClick={closeToast} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button> */}
      </div>

      {/* Middle section: Message */}
      <p className="text-sm text-gray-500 mb-3">{message || 'Something went wrong'}</p>

      {/* Bottom section: Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleTryAgainClick}
          className="bg-gray-800 text-white text-xs font-bold py-1.5 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default CustomErrorToast;