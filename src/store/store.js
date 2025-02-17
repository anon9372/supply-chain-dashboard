// src/store/store.js
import { createStore } from "redux";

// Initial Data
const initialState = [
  {
    country: "India",
    region: "North",
    supplyType: "Wheat",
    spendAmount: "5000 USD",
    date: "2023-01-01",
    severity: "critical",
    severityDescription: "Shipment Delayed",
  },
  {
    country: "USA",
    region: "South",
    supplyType: "Corn",
    spendAmount: "8000 USD",
    date: "2023-02-15",
    severity: "moderate",
    severityDescription: "Increased Costs",
  },
  {
    country: "Germany",
    region: "East",
    supplyType: "Barley",
    spendAmount: "6000 USD",
    date: "2023-03-10",
    severity: "low",
    severityDescription: "Minor Delays",
  },
  {
    country: "Germany",
    region: "East",
    supplyType: "Barley",
    spendAmount: "6000 USD",
    date: "2023-03-10",
    severity: "low",
    severityDescription: "Minor Delays",
  }
];

// Reducer Function
function dataReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA":
      return [...state, action.payload]; 
    case "UPDATE_DATA":
      return action.payload; // Update the state with new data
    default:
      return state; // Return the current state by default
  }
}

// Create the Redux Store
const store = createStore(dataReducer);

export default store;