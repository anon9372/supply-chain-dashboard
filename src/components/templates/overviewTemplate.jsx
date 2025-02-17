import React from "react";
import PropTypes from "prop-types";
import Button from "../atoms/button";
import Card from "../atoms/card";
import AddDataModal from "../organisms/addDataModal";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const OverviewTemplate = ({ isModalOpen, setIsModalOpen }) => {
  const storeData = useSelector((state) => state);

  const getCountBySeverity = (severityLevel) => {
    return storeData.filter((item) => item.severity === severityLevel).length;
  };

  const criticalCount = getCountBySeverity("critical");
  const severeCount = getCountBySeverity("severe");
  const moderateCount = getCountBySeverity("moderate");
  const lowCount = getCountBySeverity("low");

  const supplyTypes = [...new Set(storeData.map((item) => item.supplyType))];
  const barChartData = {
    labels: supplyTypes,
    datasets: [
      {
        label: "Spend ($)",
        data: supplyTypes.map((type) =>
          storeData
            .filter((item) => item.supplyType === type)
            .reduce((sum, item) => sum + parseFloat(item.spendAmount), 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#F5f5f5"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Total Spend by Supply Type" },
    },
  };

  const uniqueDates = [...new Set(storeData.map((item) => item.date))].sort();
  const lineChartData = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Spend ($)",
        data: uniqueDates.map((date) =>
          storeData
            .filter((item) => item.date === date)
            .reduce((sum, item) => sum + parseFloat(item.spendAmount), 0)
        ),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Procurement Spend Trends Over Time" },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Data</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Critical" value={criticalCount} color="red" />
        <Card title="Severe" value={severeCount} color="orange" />
        <Card title="Moderate" value={moderateCount} color="yellow" />
        <Card title="Low" value={lowCount} color="green" />
      </div>

      <div className="flex gap-4">
        <div className="bg-white p-4 rounded shadow-md flex-1">
          <h2 className="text-xl font-bold mb-4">Data Insights</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <div className="bg-white p-4 rounded shadow-md flex-1">
          <h2 className="text-xl font-bold mb-4">Trends</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      <AddDataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

OverviewTemplate.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default OverviewTemplate;