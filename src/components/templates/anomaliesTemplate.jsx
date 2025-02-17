import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddDataModal from "../organisms/addDataModal";
import { useSelector } from "react-redux";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnomaliesTemplate = ({filterData}) => {
  const storeData = useSelector((state) => state);
  const anomaliesData = storeData.map((item) => ({
    severityLevel: item.severity,
    description: item.severityDescription,
    date: item.date,
    country: item.country,
    region: item.region,
  }));

  const [filteredData, setFilteredData] = useState(anomaliesData);
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

  const barChartData = {
    labels: ["Critical", "Severe", "Moderate", "Low"],
    datasets: [
      {
        label: "Count",
        data: [
          filteredData.filter((item) => item.severityLevel === "critical")
            .length,
          filteredData.filter((item) => item.severityLevel === "severe").length,
          filteredData.filter((item) => item.severityLevel === "moderate")
            .length,
          filteredData.filter((item) => item.severityLevel === "low").length,
        ],
        backgroundColor: ["#FF4500", "#FFA500", "#FFFF00", "#32CD32"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Anomalies by Severity Level" },
    },
  };

  const rowData = filteredData.map((item) => ({
    severityLevel: item.severityLevel,
    description: item.description,
    date: item.date,
    country: item.country,
    region: item.region,
  }));

  const columnDefs = [
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    {
      headerName: "Severity Level",
      field: "severityLevel",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Edit",
      sortable: false,
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
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="bg-white p-4 shadow-md" style={{ width: "50%" }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 shadow-lg w-full">
        <div
          className="ag-theme-alpine"
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <AgGridReact
            rowData={rowData}
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

      {/* Modal */}
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

export default AnomaliesTemplate;
