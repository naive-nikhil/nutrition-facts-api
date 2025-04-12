import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ onSearch }) => {
  // State for form fields
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name:asc");
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [newOpen, setNewOpen] = useState(false);

  // Refs for the dropdown containers
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Categories
  const categories = [
    "Beverages",
    "Breads",
    "Breakfast Foods",
    "Dairy",
    "Desserts",
    "Fruits",
    "Grains",
    "Legumes",
    "Nuts & Seeds",
    "Pasta",
  ];

  // Sort options
  const sortOptions = [
    { value: "name:asc", label: "Name - Asc" },
    { value: "name:desc", label: "Name - Desc" },
    { value: "glycemicIndex:asc", label: "GI - Low to High" },
    { value: "glycemicIndex:desc", label: "GI - High to Low" },
  ];

  // Handle clicks outside the dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown === "category" &&
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      if (
        openDropdown === "sort" &&
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Toggle dropdown function
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create search params object
    const searchParams = {
      search: searchTerm,
      sortBy: sortBy,
      page: 1, // Reset to first page on new search
    };

    // Only add category if one is selected
    if (category) {
      searchParams.category = category;
    }

    // Call the onSearch callback with search parameters
    onSearch(searchParams);
  };

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
    setSortBy("name:asc");

    // Perform search with reset values
    onSearch({ sortBy: "name:desc", page: 1, limit: 5 });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full justify-center gap-2">
      {/* Search Bar */}
      <div className="flex w-full text-black bg-white rounded-full border border-[#CBD5E0]">
        <input
          type="text"
          placeholder="Search for foods..."
          className="outline-none w-full px-8 text-lg font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer outline-none px-8 py-5 bg-[#2C7A7B] hover:bg-[#286e6f]  text-white rounded-full text-lg font-medium"
        >
          Search
        </button>
      </div>

      {/* Select Categories */}
      <div className="flex justify-center" ref={categoryDropdownRef}>
        <div
          onClick={() => toggleDropdown("category")}
          className="flex justify-center items-center cursor-pointer px-8 bg-[#E2E8F0] text-[#2D3748] rounded-full text-lg font-medium text-nowrap select-none"
        >
          {category || "Filters"}
          <span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>

        {openDropdown === "category" && (
          <div className="absolute justify-center mt-20 flex flex-col bg-[#E2E8F0] text-[#2D3748] font-medium rounded-2xl shadow-lg text-lg overflow-hidden">
            <div>
              <div
                onClick={() => setNewOpen(!newOpen)}
                className="flex items-center gap-2 px-7 py-5 border-b-1 border-zinc-300 cursor-pointer select-none hover:bg-[#2C7A7B] hover:text-white transition-colors duration-200"
              >
                Categories
                <span>
                  <svg
                    className="w-4 h-4 ml-2 -rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 px-7 py-5 border-b-1 border-zinc-300 cursor-pointer select-none hover:bg-[#2C7A7B] hover:text-white transition-colors duration-200">
                GI Range
                <span>
                  <svg
                    className="w-4 h-4 ml-2 -rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 px-7 py-5 border-b-1 border-zinc-300 cursor-pointer select-none hover:bg-[#2C7A7B] hover:text-white transition-colors duration-200">
                Sort By
                <span>
                  <svg
                    className="w-4 h-4 ml-2 -rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            {newOpen && (
              <div className="absolute overflow-scroll h-[280px] bg-[#E2E8F0] top-0 w-full">
                <div
                  onClick={() => setNewOpen(!newOpen)}
                  className="flex items-center gap-2 px-7 py-5 border-b-1 border-zinc-300 cursor-pointer select-none hover:bg-[#2C7A7B] hover:text-white transition-colors duration-200"
                >
                  Close
                  <span>
                    <svg
                      className="w-4 h-4 ml-2 -rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </div>
                {categories.map((value) => (
                  <option
                    key={value}
                    className="flex items-center gap-2 px-7 py-5 border-b-1 border-zinc-300 cursor-pointer select-none hover:bg-[#2C7A7B] hover:text-white transition-colors duration-200"
                  >
                    {value}
                  </option>
                ))}
              </div>
            )}

            <div className="flex justify-center items-center gap-8 px-7 py-5 cursor-pointer select-none bg-[#2C7A7B] text-white transition-colors duration-200">
              <button>Apply</button>
              <button>Clear</button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
