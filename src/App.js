import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/organisms/sidebar";
import NavBar from "./components/organisms/navbar";
import Overview from "./pages/overview";
import Anomalies from "./pages/anomalies";
import DataInsights from "./pages/dataInsights";
import Trends from "./pages/trends";
import LoginPage from "./pages/login";

const AppContent = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen">
      {!isLoginPage && <NavBar toggleSidebar={toggleSidebar} />}

      <div className="flex flex-1 overflow-hidden">
        {!isLoginPage && (
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        )}

        <div
          className={`flex-1 p-8 bg-gray-100 transition-all duration-300 overflow-y-auto ${
            !isLoginPage && isExpanded ? "ml-64" : "ml-0"
          }`}
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Overview />} />
            <Route path="/anomalies" element={<Anomalies />} />
            <Route path="/data-insights" element={<DataInsights />} />
            <Route path="/trends" element={<Trends />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;