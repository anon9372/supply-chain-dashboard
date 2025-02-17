import React from "react";

const NavBar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
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
        </button>

        <div className="text-lg font-bold">Supply Chain Dashboard</div>
      </div>

      <div className="flex items-center space-x-4">
        <span>Welcome, User</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
