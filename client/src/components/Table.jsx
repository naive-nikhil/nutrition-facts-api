import React, { useState, useEffect } from "react";

// Helper function to determine GI classification and styling
const getGIClassification = (value) => {
  if (value === undefined || value === null) return { class: "", label: "" };

  if (value <= 55) {
    return {
      class: "before:bg-green-500",
      label: "Low",
    };
  } else if (value <= 69) {
    return {
      class: "before:bg-amber-500",
      label: "Medium",
    };
  } else {
    return {
      class: "before:bg-red-500",
      label: "High",
    };
  }
};

const Table = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFoods();
  }, [currentPage]);

  const fetchFoods = async (searchParams = { limit: 5 }) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...searchParams,
      });

      const url = `${API_URL}/api/foods?${queryParams}`;
      console.log("Fetching from:", url); // Debug log

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setFoods(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      console.error("Fetch error:", err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg
          className="w-4 h-4 ml-1 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortDirection === "asc" ? (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  // Empty state
  if (foods.length === 0) {
    return (
      <div className="w-full mt-8">
        <div className="py-16 flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-sm">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No foods found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100">
          <table className="w-full text-left">
            <thead className="text-lg bg-[#EEEEEE] text-[#333]">
              <tr>
                <th
                  className="px-6 py-6 font-semibold border-b-2 border-gray-200 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th
                  className="px-6 py-6 font-semibold border-b-2 border-gray-200 cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    <SortIcon field="category" />
                  </div>
                </th>
                <th
                  className="px-6 py-6 font-semibold border-b-2 border-gray-200 cursor-pointer"
                  onClick={() => handleSort("glycemicIndex")}
                >
                  <div className="flex items-center">
                    Glycemic Index
                    <SortIcon field="glycemicIndex" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {foods.map((food) => {
                const giClass = getGIClassification(food.glycemicIndex);
                return (
                  <tr
                    key={food._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-6 border-b border-gray-100">
                      {food.name}
                    </td>
                    <td className="px-6 py-6 border-b border-gray-100">
                      {food.category}
                    </td>
                    <td
                      className={`px-6 py-6 border-b border-gray-100 relative pl-8 ${giClass.class} before:content-[''] before:absolute before:left-6 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full`}
                    >
                      {food.glycemicIndex}
                      <span className="text-xs ml-2 text-gray-500">
                        ({giClass.label})
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {foods.map((food) => {
          const giClass = getGIClassification(food.glycemicIndex);
          return (
            <div
              key={food._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="font-medium text-lg">{food.name}</div>
              <div className="text-sm text-gray-500 mt-1">{food.category}</div>
              <div className="mt-3 flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${giClass.class} before:content-[''] before:mr-1.5 before:w-2 before:h-2 before:rounded-full`}
                >
                  GI: {food.glycemicIndex} ({giClass.label})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 bg-white rounded-lg shadow-sm border border-gray-100 p-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-[#2A7D7D] text-white rounded shadow-sm hover:bg-[#236868] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-[#2A7D7D] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-[#2A7D7D] text-white rounded shadow-sm hover:bg-[#236868] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
