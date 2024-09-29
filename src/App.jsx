import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Tabs, Tab } from "react-bootstrap"; // Import Tabs and Tab components

function App() {
  const [formData, setFormData] = useState({
    region: "",
    month: "",
    population: "",
    prev_demand: "",
  });
  const [predictedDemand, setPredictedDemand] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("BCG");
  const [headline, setHeadline] = useState("BCG");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "population" || name === "prev_demand") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setFormData({ ...formData, [name]: numericValue.slice(0, 5) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictedDemand("");
    setError("");
    try {
      const endpoint = activeTab === "BCG" ? "predict2" : "predict"; // Change endpoint based on active tab
      const response = await axios.post(
        `https://whfgrx3r-8080.asse.devtunnels.ms/${endpoint}`,
        formData
      );
      setPredictedDemand(
        `Predicted Demand: ${response.data.predicted_demand} vaccines`
      );
    } catch (error) {
      setError(
        `An error occurred while predicting ${activeTab.toLowerCase()} vaccine demand. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setHeadline(tab); // Update the headline to match the selected tab

    // Clear the form fields by resetting formData to its initial state
    setFormData({
      region: "",
      month: "",
      population: "",
      prev_demand: "",
    });

    // Also clear predicted demand and errors
    setPredictedDemand("");
    setError("");
  };

  return (
    <>
    <div className="container">
      <h3 className="space">{headline} VACCINE DEMAND FORECAST</h3>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        <Tab
          eventKey="BCG"
          title={<span className={activeTab === "BCG" ? "active-tab-text" : "inactive-tab-text"}>BCG Vaccine</span>}
          tabClassName={activeTab === "BCG" ? "active-tab" : ""}
        >
          <form onSubmit={handleSubmit}>
            <VaccineForm
              formData={formData}
              handleChange={handleChange}
              loading={loading}
              error={error}
              predictedDemand={predictedDemand}
              activeTab={activeTab}
            />
          </form>
        </Tab>
        <Tab
          eventKey="Polio"
          title={<span className={activeTab === "Polio" ? "active-tab-text" : "inactive-tab-text"}>Polio Vaccine</span>}
          tabClassName={activeTab === "Polio" ? "active-tab" : ""}
        >
          <form onSubmit={handleSubmit}>
            <VaccineForm
              formData={formData}
              handleChange={handleChange}
              loading={loading}
              error={error}
              predictedDemand={predictedDemand}
              activeTab={activeTab}
            />
          </form>
        </Tab>
      </Tabs>
    </div>
  </>
  );
}

function VaccineForm({ formData, handleChange, loading, error, predictedDemand, activeTab }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="region" className="form-label">
          Region
        </label>
        <select
          className="form-select"
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a region
          </option>
          <option value="1">Region 1</option>
          <option value="2">Region 2</option>
          <option value="3">Region 3</option>
          <option value="4">Region 4</option>
          <option value="5">Region 5</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="month" className="form-label">
          Month
        </label>
        <select
          className="form-select"
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a month
          </option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="population" className="form-label">
          Population
        </label>
        <input
          type="number"
          className="form-control"
          id="population"
          name="population"
          value={formData.population}
          onChange={handleChange}
          required
          maxLength="5"
          placeholder="Enter population"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="prev_demand" className="form-label">
          Previous Demand
        </label>
        <input
          type="number"
          className="form-control"
          id="prev_demand"
          name="prev_demand"
          value={formData.prev_demand}
          onChange={handleChange}
          required
          maxLength="5"
          placeholder="Enter previous demand"
        />
      </div>

      <div className="form-group d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {loading ? "Predicting..." : "Predict"}
        </button>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      <div id="result" className="mt-4 position-relative">
        <div className="mt-4 text-center" id="predicted-value">
          <h3 className="text-center" id="predicted-value">
            {predictedDemand}
          </h3>
        </div>

        {loading && (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
