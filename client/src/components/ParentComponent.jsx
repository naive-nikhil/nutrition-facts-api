import React from "react";
import SearchBar from "./SearchBar";
import Table from "./Table";

const ParentComponent = () => {
  const handleSearch = (searchParams) => {
    // Pass these search parameters to Table component
    // You'll need to modify the Table component to accept and use these parameters
  };

  return (
    <div className="flex items-center flex-col w-1/2">
      <SearchBar onSearch={handleSearch} />
      <Table />
    </div>
  );
};

export default ParentComponent;
