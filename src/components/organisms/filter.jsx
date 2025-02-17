// src/components/organisms/Filter.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "../atoms/select";
import Button from "../atoms/button";

const Filter = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    country: "",
    region: "",
  });

  // Handle changes in filters
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle Search button click
  const handleSearch = () => {
    onSearch(filters);
  };

  // Handle Reset button click
  const handleReset = () => {
    setFilters({ country: "", region: "" });
    onReset();
  };

  return (
    <div className="flex space-x-4">
      {/* Country */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <Select
          name="country"
          value={filters.country}
          onChange={handleChange}
          options={[
            { value: "", label: "All Countries" },
            { value: "USA", label: "USA" },
            { value: "Brazil", label: "Brazil" },
            { value: "Germany", label: "Germany" },
            { value: "India", label: "India" },
            { value: "Australia", label: "Australia" },
          ]}
          placeholder="Select a country..."
        />
      </div>

      {/* Region */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Region</label>
        <Select
          name="region"
          value={filters.region}
          onChange={handleChange}
          options={[
            { value: "", label: "All Regions" },
            { value: "North America", label: "North America" },
            { value: "South America", label: "South America" },
            { value: "Europe", label: "Europe" },
            { value: "Asia", label: "Asia" },
            { value: "Africa", label: "Africa" },
          ]}
          placeholder="Select a region..."
        />
      </div>

      {/* Buttons */}
      <div className="flex items-end justify-end space-x-2 flex-1">
        <Button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </Button>
        <Button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Filter;