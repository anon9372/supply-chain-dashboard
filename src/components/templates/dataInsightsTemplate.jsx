import React, { useState, useEffect } from "react";
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
import AddDataModal from "../organisms/addDataModal";
import { useSelector } from "react-redux";

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
  const storeData = useSelector((state) => state);

  const [filteredData, setFilteredData] = useState(storeData);

  useEffect(() => {
    setFilteredData(storeData);
  }, [storeData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

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
      headerName: "Edit",
      field: "edit",
      cellRenderer: (params) => (
        <button
          onClick={() => openModal(params.data)}
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
      width: 100,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between space-x-4">
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

      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
        <div
          className="ag-theme-alpine"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            pagination={false}
            domLayout="autoHeight"
            suppressHorizontalScroll={true}
            rowStyle={{ fontSize: "14px", lineHeight: "1.6" }}
            headerHeight={55}
            rowHeight={45}
            defaultColDef={{
              flex: 1,
              minWidth: 120,
              sortable: true,
              filter: true,
              resizable: true,
              cellStyle: {
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              },
            }}
            getRowStyle={(params) => ({
              backgroundColor:
                params.node.rowIndex % 2 === 0 ? "#F8FAFC" : "#FFFFFF",
              borderBottom: "1px solid #E2E8F0",
              transition: "background 0.3s ease",
            })}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddDataModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={selectedRow}
        />
      )}
    </div>
  );
};

export default DataInsightsTemplate;
