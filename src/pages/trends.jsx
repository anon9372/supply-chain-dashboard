// src/pages/Trends.jsx
import React, {useState} from 'react';
import TrendsTemplate from '../components/templates/trendsTemplate';
import Filter from '../components/organisms/filter';
import { dummyData } from '../data/dummyData';

const Trends = () => {
  // Example filtered data (replace with actual data from state or API)
      const [filteredData, setFilteredData] = useState(dummyData);
  

  // const filteredData = [
  //   { dateRange: '2023-01-01 - 2023-01-31', spendAmount: 12000, region: 'Region A' },
  //   { dateRange: '2023-02-01 - 2023-02-28', spendAmount: 8500, region: 'Region B' },
  // ];
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trends</h1>
        <Filter onSearch={handleSearch} onReset={handleReset} />
      </div>

      <TrendsTemplate filteredData={filteredData} />
    </div>
  )
};

export default Trends;