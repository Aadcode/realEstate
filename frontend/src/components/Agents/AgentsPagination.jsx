
import React, { useState } from "react";

const AgentsPagination = ({ agentCount, currentPage = 1, onPageChange }) => {
  const [activePage, setActivePage] = useState(currentPage);
  const totalPages = Math.ceil(agentCount/12)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      if (onPageChange) onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border border-indigo-700 bg-opacity-10 
        ${activePage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-indigo-50"} transition`}
        aria-label="Previous Page"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/dfeb09a56b1add325e5227ca707cdb79d1b5bd57"
          className="object-contain w-3.5 aspect-square"
          alt="Previous"
        />
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`h-11 w-11 flex items-center justify-center rounded-xl border transition ${
              activePage === pageNumber
                ? "bg-indigo-700 text-white border-indigo-700 shadow-lg"
                : "text-indigo-700 border-transparent hover:bg-indigo-50"
            }`}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border border-indigo-700 bg-opacity-10 
        ${activePage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-indigo-50"} transition`}
        aria-label="Next Page"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/b4b52c9084dd0f3bfa808204f883d7d32de3f85a"
          className="object-contain w-full h-full"
          alt="Next"
        />
      </button>
    </div>
  );
};

export default AgentsPagination;
