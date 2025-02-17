import React from "react";
import PropTypes from "prop-types";
import Creatable from "react-select/creatable";
import SeverityLevelDropdown from "../molecules/severityLevelDropdown";
import SpendAmountInput from "../molecules/spendAmountInput";

const AddDataForm = ({ formData = {}, handleChange, handleDateChange }) => {
  const data = {
    date: formData.date || null,
    severityLevel: formData.severityLevel || "",
    spendAmount: formData.spendAmount || "",
    supplyType: formData.supplyType || "",
    country: formData.country || "",
    region: formData.region || "",
    description: formData.description || "",
  };

  const predefinedSupplyTypes = [
    { value: "Rice", label: "Rice" },
    { value: "Wheat", label: "Wheat" },
    { value: "Barley", label: "Barley" },
    { value: "Cotton", label: "Cotton" },
    { value: "Pulses", label: "Pulses" },
  ];

  const predefinedCountries = [
    { value: "India", label: "India" },
    { value: "China", label: "China" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Singapore", label: "Singapore" },
    { value: "Japan", label: "Japan" },
  ];

  const regionOptions = [
    { value: "North", label: "North" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "South", label: "South" },
  ];

  const handleCreatableChange = (selectedOption, name) => {
    const value = selectedOption ? selectedOption.value : "";
    handleChange({ target: { name, value } });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleDateChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Severity Level
        </label>
        <SeverityLevelDropdown
          value={data.severityLevel}
          onChange={(e) =>
            handleChange({
              target: { name: "severityLevel", value: e.target.value },
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Spend Amount ($)
        </label>
        <SpendAmountInput
          value={data.spendAmount}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Supply Type
        </label>
        <Creatable
          options={predefinedSupplyTypes}
          value={
            predefinedSupplyTypes.find(
              (option) => option.value === data.supplyType
            ) || null
          }
          onChange={(selectedOption) => {
            handleCreatableChange(selectedOption, "supplyType");
          }}
          placeholder="Select or create a supply type..."
          isClearable
          formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: "#d1d5db",
              borderRadius: "0.375rem",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#9ca3af",
              },
            }),
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <Creatable
          options={predefinedCountries}
          value={
            predefinedCountries.find(
              (option) => option.value === data.country
            ) || null
          }
          onChange={(selectedOption) =>
            handleCreatableChange(selectedOption, "country")
          }
          placeholder="Select or create a country..."
          isClearable
          formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: "#d1d5db",
              borderRadius: "0.375rem",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#9ca3af",
              },
            }),
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Region
        </label>
        <select
          name="region"
          value={data.region}
          onChange={(e) => handleChange(e)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Select a region...</option>
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Creatable
          options={[
            {
              value: "Unexpected spike in food procurement costs",
              label: "Unexpected spike in food procurement costs",
            },
            {
              value: "Delayed shipment of agricultural products",
              label: "Delayed shipment of agricultural products",
            },
            {
              value: "Increased logistics costs due to rising fuel prices",
              label: "Increased logistics costs due to rising fuel prices",
            },
            {
              value: "Minor delay in rice delivery due to weather conditions",
              label: "Minor delay in rice delivery due to weather conditions",
            },
          ]}
          value={
            [
              {
                value: "Unexpected spike in food procurement costs",
                label: "Unexpected spike in food procurement costs",
              },
              {
                value: "Delayed shipment of agricultural products",
                label: "Delayed shipment of agricultural products",
              },
              {
                value: "Increased logistics costs due to rising fuel prices",
                label: "Increased logistics costs due to rising fuel prices",
              },
              {
                value: "Minor delay in rice delivery due to weather conditions",
                label: "Minor delay in rice delivery due to weather conditions",
              },
            ].find((option) => option.value === data.description) || null
          }
          onChange={(selectedOption) =>
            handleCreatableChange(selectedOption, "description")
          }
          placeholder="Select or create an anomaly description..."
          isClearable
          formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: "#d1d5db",
              borderRadius: "0.375rem",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#9ca3af",
              },
            }),
          }}
        />
      </div>
    </form>
  );
};

AddDataForm.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string, // Single date instead of date range
    severityLevel: PropTypes.string,
    spendAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    supplyType: PropTypes.string,
    country: PropTypes.string,
    region: PropTypes.string,
    description: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default AddDataForm;
