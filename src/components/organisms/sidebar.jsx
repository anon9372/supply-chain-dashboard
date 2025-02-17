// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 text-white h-screen p-4 absolute top-22 left-0 z-10 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <nav>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700">
            <Link
              to="/"
              className={`${
                isExpanded ? "flex items-center px-4" : "block"
              } py-2 mb-4 rounded `}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>

              {/* Label */}
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Overview
              </span>
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link
              to="/anomalies"
              className={`${
                isExpanded ? "flex items-center px-4" : "block"
              }  py-2  mb-4  rounded`}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>

              {/* Label */}
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Anomalies
              </span>
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link
              to="/data-insights"
              className={`${
                isExpanded ? "flex items-center px-4" : "block"
              } py-2  mb-4  rounded`}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6"
                />
              </svg>

              {/* Label */}
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Data Insights
              </span>
            </Link>
          </li>
          <li className="hover:bg-gray-700">
            <Link
              to="/trends"
              className={`${
                isExpanded ? "flex items-center px-4" : "block"
              }  py-2  mb-4  rounded`}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              {/* Label */}
              <span
                className={`ml-2 transition-opacity duration-300 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Trends
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
