// src/pages/DataInsights.jsx
import React, {useState} from "react";
import DataInsightsTemplate from "../components/templates/dataInsightsTemplate";
import Filter from "../components/organisms/filter";

const DataInsights = () => {
    const dummyData = [
      {
        severityLevel: "Critical",
        description: "Unexpected spike in food procurement costs.",
        dateRange: "2023-01-01 - 2023-01-31",
        country: "USA",
        region: "North America",
      },
      {
        severityLevel: "Severe",
        description: "Delayed shipment of agricultural products.",
        dateRange: "2023-02-01 - 2023-02-28",
        country: "Brazil",
        region: "South America",
      },
      {
        severityLevel: "Moderate",
        description: "Increased logistics costs due to rising fuel prices.",
        dateRange: "2023-03-01 - 2023-03-31",
        country: "Germany",
        region: "Europe",
      },
      {
        severityLevel: "Low",
        description: "Minor delay in rice delivery due to weather conditions.",
        dateRange: "2023-04-01 - 2023-04-30",
        country: "India",
        region: "Asia",
      },
    ];
  
    const [filteredData, setFilteredData] = useState(dummyData);
  
    // Handle Search
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
  
    // Handle Reset
    const handleReset = () => {
      setFilteredData(dummyData);
    };
  
  // const filteredData = [
  //   { region: "Region A", supplyType: "Food", spendAmount: 12000 },
  //   { region: "Region B", supplyType: "Agriculture", spendAmount: 8500 },
  // ];

  return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Data Insights</h1>
      <Filter onSearch={handleSearch} onReset={handleReset} />
    </div>

    <DataInsightsTemplate filteredData={filteredData} />
  </div>);
};

export default DataInsights;
