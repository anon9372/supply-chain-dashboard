import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className={`bg-white p-4 rounded shadow-md`}>
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full bg-${color}-500`}
          style={{ backgroundColor: `${color}` }}
        ></div>
        <h3 className={`text-lg font-semibold text-${color}-700`}>{title}</h3>
      </div>

      <div className="flex items-end mt-5 gap-5">
        <p className="text-2xl">{value}</p>

        <p className="text-sm text-gray-500">since last update</p>
      </div>
    </div>
  );
};

export default Card;
