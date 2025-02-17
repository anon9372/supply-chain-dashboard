import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddDataModal from "../organisms/addDataModal"; // Import your modal component
import { useSelector } from "react-redux"; // Import useSelector from react-redux

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DataInsightsTemplate = () => {
  // Access the Redux store data
  const storeData = useSelector((state) => state);

  // State for filtered data
  const [filteredData, setFilteredData] = useState(storeData);

  // Update filteredData when storeData changes
  useEffect(() => {
    setFilteredData(storeData);
  }, [storeData]);

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

  // Bar Chart: Spend by Country
  const countries = [...new Set(filteredData.map((item) => item.country))];
  const barChartData = {
    labels: countries,
    datasets: [
      {
        label: "Spend ($)",
        data: countries.map((country) =>
          filteredData
            .filter((item) => item.country === country)
            .reduce((sum, item) => sum + parseFloat(item.spendAmount), 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#32CD32"],
      },
    ],
  };

  // Pie Chart: Spend by Supply Type
  const supplyTypes = [...new Set(filteredData.map((item) => item.supplyType))];
  const pieChartData = {
    labels: supplyTypes,
    datasets: [
      {
        label: "Spend ($)",
        data: supplyTypes.map((type) =>
          filteredData
            .filter((item) => item.supplyType === type)
            .reduce((sum, item) => sum + parseFloat(item.spendAmount), 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // AG Grid Column Definitions
  const columnDefs = [
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    {
      headerName: "Supply Type",
      field: "supplyType",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Spend Amount ($)",
      field: "spendAmount",
      sortable: true,
      filter: true,
    },
    { headerName: "Date", field: "date", sortable: true, filter: true },
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
    <div className="p-6 space-y-6">
      {/* Charts Section */}
      <div className="flex justify-between space-x-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow-md flex-1">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true, text: "Total Spend by Country" },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow-md flex-1">
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: {
                  display: true,
                  text: "Spend Distribution by Supply Type",
                },
              },
            }}
          />
        </div>
      </div>

      {/* AG Grid Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
        <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
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

export default DataInsightsTemplate;