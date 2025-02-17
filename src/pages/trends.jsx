import React, { useState } from "react";
import TrendsTemplate from "../components/templates/trendsTemplate";
import Filter from "../components/organisms/filter";
import { dummyData } from "../data/dummyData";

const Trends = () => {
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (filters) => {
    const { country, region, dateRange } = filters;

    const filtered = dummyData.filter((item) => {
      const matchesCountry = !country || item.country === country;
      const matchesRegion = !region || item.region === region;
      const matchesDateRange =
        (!dateRange[0] && !dateRange[1]) ||
        (new Date(item.dateRange.split(" - ")[0]) >= dateRange[0] &&
          new Date(item.dateRange.split(" - ")[1]) <= dateRange[1]);

      return matchesCountry && matchesRegion && matchesDateRange;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilteredData(dummyData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trends</h1>
        <Filter onSearch={handleSearch} onReset={handleReset} />
      </div>

      <TrendsTemplate filteredData={filteredData} />
    </div>
  );
};

export default Trends;
