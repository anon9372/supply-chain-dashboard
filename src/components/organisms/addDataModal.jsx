import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import AddDataForm from "../organisms/addDataForm";
import { useDispatch } from "react-redux";
import "../../style/modal.css";

const AddDataModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: null,
    severityLevel: "",
    spendAmount: "",
    supplyType: "",
    country: "",
    region: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormData((prevData) => ({ ...prevData, date: e.target.value }));
  };

  const handleSubmit = () => {
   
    dispatch({
      type: "ADD_DATA",
      payload: {
        country: formData.country,
        region: formData.region,
        supplyType: formData.supplyType,
        spendAmount: formData.spendAmount,
        date: formData.date,
        severity: formData.severityLevel.toLowerCase(),
        severityDescription: formData.description,
      },
    });

    console.log("Form Data Submitted:", formData);
    onClose();
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
          formData={formData}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
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