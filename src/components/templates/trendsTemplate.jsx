import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddDataModal from "../organisms/addDataModal";
import { useSelector } from "react-redux";

const TrendsTemplate = () => {
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

  const prepareLineChartData = () => {
    const uniqueDates = [
      ...new Set(filteredData.map((item) => item.date)),
    ].sort();

    const groupedData = uniqueDates.map((date) => {
      const totalSpend = filteredData
        .filter((item) => item.date === date)
        .reduce((sum, item) => sum + parseFloat(item.spendAmount), 0);
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

  const columnDefs = [
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "Region",
      field: "region",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "Spend Amount ($)",
      field: "spendAmount",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      width: 150,
    },
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
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <Line data={lineChartData} options={lineChartOptions} />
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

export default TrendsTemplate;
