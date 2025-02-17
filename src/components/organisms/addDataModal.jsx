// src/components/organisms/AddDataModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import AddDataForm from "../organisms/addDataForm";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import "../../style/modal.css";

const AddDataModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  // Initialize formData with default values
  const [formData, setFormData] = useState({
    date: null, // Single date instead of date range
    severityLevel: "",
    spendAmount: "",
    supplyType: "",
    country: "",
    region: "",
    description: "",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle single date change
  const handleDateChange = (e) => {
    setFormData((prevData) => ({ ...prevData, date: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Dispatch an action to add the new data to the Redux store
    dispatch({
      type: "ADD_DATA",
      payload: {
        country: formData.country,
        region: formData.region,
        supplyType: formData.supplyType,
        spendAmount: formData.spendAmount,
        date: formData.date,
        severity: formData.severityLevel.toLowerCase(), // Convert to lowercase for consistency
        severityDescription: formData.description,
      },
    });

    console.log("Form Data Submitted:", formData);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Data</h2>
        <AddDataForm
          formData={formData} // Pass formData to the child component
          handleChange={handleChange}
          handleDateChange={handleDateChange} // Pass handleDateChange for single date
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

AddDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddDataModal;