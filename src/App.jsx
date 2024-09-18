import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        region: '',
        month: '',
        population: '',
        prev_demand: ''
    });
    const [predictedDemand, setPredictedDemand] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPredictedDemand('');

        try {
            const response = await axios.post('https://whfgrx3r-8080.asse.devtunnels.ms/predict', formData);
            setPredictedDemand(`Predicted Demand: ${response.data.predicted_demand}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>BCG VACCINE DEMAND FORECAST</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="region" className="form-label">Region</label>
                    <select
                        className="form-select"
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a region</option>
                        <option value="1">Region 1</option>
                        <option value="2">Region 2</option>
                        <option value="3">Region 3</option>
                        <option value="4">Region 4</option>
                        <option value="5">Region 5</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="month" className="form-label">Month</label>
                    <select
                        className="form-select"
                        id="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a month</option>
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
                    <label htmlFor="population" className="form-label">Population</label>
                    <input
                        type="number"
                        className="form-control"
                        id="population"
                        name="population"
                        value={formData.population}
                        onChange={handleChange}
                        required
                        maxLength="7"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="prev_demand" className="form-label">Previous Demand</label>
                    <input
                        type="number"
                        className="form-control"
                        id="prev_demand"
                        name="prev_demand"
                        value={formData.prev_demand}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Predicting...' : 'Predict'}
                    </button>
                    <a href="/chart" className="btn btn-chart" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/chart';
                    }}>View Chart</a>
                </div>
            </form>

            <hr />
            <div id="result" className="mt-4">
                <h3 className="text-center" id="predicted-value">{predictedDemand}</h3>
            </div>

            {loading && <div id="loader"></div>}
        </div>
    );
}

export default App;
