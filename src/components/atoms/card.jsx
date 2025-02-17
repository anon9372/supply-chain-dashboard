// src/components/atoms/Card.jsx
import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className={`bg-white p-4 rounded shadow-md`}>
      {/* Title with Colored Circle */}
      <div className="flex items-center space-x-2">
        {/* Colored Circle */}
        <div
          className={`w-3 h-3 rounded-full bg-${color}-500`}
          style={{ backgroundColor: `${color}` }}
        ></div>
        {/* Title */}
        <h3 className={`text-lg font-semibold text-${color}-700`}>{title}</h3>
      </div>

      <div className="flex items-end mt-5 gap-5">
        {/* Value */}
        <p className="text-2xl">{value}</p>

        {/* Subtext */}
        <p className="text-sm text-gray-500">since last update</p>
      </div>
    </div>
  );
};

export default Card;
