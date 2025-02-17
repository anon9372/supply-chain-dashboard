import React, { useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddDataModal from "../organisms/addDataModal"; // Import your modal component

const dummyData = [
  {
    country: "USA",
    region: "North America",
    supplyType: "Food",
    spendAmount: 20000,
    date: "2023-01-01",
  },
  {
    country: "Brazil",
    region: "South America",
    supplyType: "Agriculture",
    spendAmount: 15000,
    date: "2023-02-15",
  },
  {
    country: "Germany",
    region: "Europe",
    supplyType: "Logistics",
    spendAmount: 10000,
    date: "2023-03-10",
  },
  {
    country: "India",
    region: "Asia",
    supplyType: "Food",
    spendAmount: 18000,
    date: "2023-04-05",
  },
];

const TrendsTemplate = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data

  // Function to open the modal
  const openModal = (rowData) => {
    setSelectedRow(rowData); // Set the selected row data
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedRow(null); // Clear the selected row data
    setIsModalOpen(false); // Close the modal
  };

  // Prepare Line Chart Data
  const prepareLineChartData = () => {
    // Extract unique dates and sort them
    const uniqueDates = [...new Set(filteredData.map((item) => item.date))].sort();

    // Group spend amounts by date
    const groupedData = uniqueDates.map((date) => {
      const totalSpend = filteredData
        .filter((item) => item.date === date)
        .reduce((sum, item) => sum + item.spendAmount, 0);

      return { date, totalSpend };
    });

    return {
      labels: groupedData.map((item) => item.date),
      datasets: [
        {
          label: "Spend ($)",
          data: groupedData.map((item) => item.totalSpend),
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const lineChartData = prepareLineChartData();

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Procurement Spend Trends Over Time" },
    },
  };

  // AG Grid Column Definitions
  const columnDefs = [
    { headerName: "Country", field: "country", sortable: true, filter: true, width: 150 },
    { headerName: "Region", field: "region", sortable: true, filter: true, width: 150 },
    {
      headerName: "Spend Amount ($)",
      field: "spendAmount",
      sortable: true,
      filter: true,
      width: 150,
    },
    { headerName: "Date", field: "date", sortable: true, filter: true, width: 150 },
    {
      headerName: "Edit", // New column for edit action
      field: "edit",
      cellRenderer: (params) => (
        <button
          onClick={() => openModal(params.data)} // Pass row data to the modal
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      ),
      width: 100, // Fixed width for the edit column
    },
  ];

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow-md">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      {/* AG Grid Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
        <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            suppressHorizontalScroll={true}
            rowStyle={{ fontSize: "14px", lineHeight: "1.6" }}
            headerHeight={50}
            rowHeight={40}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddDataModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={selectedRow} // Pass the selected row data to the modal
        />
      )}
    </div>
  );
};

export default TrendsTemplate;