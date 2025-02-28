import React, { useState } from "react";
import AnomaliesTemplate from "../components/templates/anomaliesTemplate";

import Filter from "../components/organisms/filter";

const Anomalies = () => {
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

  const handleSearch = (filters) => {
    const { country, region, dateRange } = filters;

    const filtered = dummyData.filter((item) => {
      const matchesCountry = !country || item.country === country;
      const matchesRegion = !region || item.region === region;
      return matchesCountry && matchesRegion;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilteredData(dummyData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anomalies</h1>
        <Filter onSearch={handleSearch} onReset={handleReset} />
      </div>

      <AnomaliesTemplate />
    </div>
  );
};

export default Anomalies;
