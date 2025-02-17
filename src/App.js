import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/organisms/sidebar";
import NavBar from "./components/organisms/navbar";
import Overview from "./pages/overview";
import Anomalies from "./pages/anomalies";
import DataInsights from "./pages/dataInsights";
import Trends from "./pages/trends";

const App = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
          <div
            className={`flex-1 p-8 bg-gray-100 transition-all duration-300 overflow-y-auto ${
              isExpanded ? "ml-64" : "ml-16"
            }`}
            style={{ maxHeight: "calc(100vh - 64px)" }}
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/anomalies" element={<Anomalies />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/trends" element={<Trends />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App; 