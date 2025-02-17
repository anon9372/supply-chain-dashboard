import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "../atoms/select";
import Button from "../atoms/button";

const Filter = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    country: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({ country: "", region: "" });
    onReset();
  };

  return (
    <div className="flex space-x-4">
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
            { value: "Japan", label: "Japan" },
            { value: "Singapore", label: "Singapore" },
            { value: "Vietnam", label: "Vietnam" },
          ]}
          placeholder="Select a country..."
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Region</label>
        <Select
          name="region"
          value={filters.region}
          onChange={handleChange}
          options={[
            { value: "", label: "All Regions" },
            { value: "North", label: "North" },
            { value: "East", label: "East" },
            { value: "West", label: "West" },
            { value: "South", label: "South" },
          ]}
          placeholder="Select a region..."
        />
      </div>

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