import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PointCloud from "./components/PointCloud";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";
import { sendSlicingRequest } from "./utils/api"; // Import the utility function

function App() {
  const [data, setData] = useState([]);
  const [slices, setSlices] = useState(1); // State for the number of slices
  const [axis, setAxis] = useState("y"); // State for the slicing axis (default is Y-axis)
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_point_cloud");
        if (Array.isArray(response.data)) {
          setData(response.data);
          console.log(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching point cloud data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCut = async () => {
    if (!slices || slices <= 0) {
      setErrorMessage("Please specify a valid number of slices."); // Set error message
      setTimeout(() => {
        setErrorMessage(""); // Clear the error message after 3 seconds
      }, 3000);
      return; // Exit the function early
    }

    try {
      const responseData = await sendSlicingRequest(axis, slices); // Use the utility function
      setSuccessMessage("Slicing request successful!"); // Set success message
      setErrorMessage(""); // Clear any previous error message

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      console.log("Slicing request successful:", responseData);
    } catch {
      setSuccessMessage(""); // Clear success message on error
      setErrorMessage("Error: Unable to process the slicing request."); // Set error message
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Floating UI for selecting slices and axis */}
      <div className="floating-ui">
        <Dropdown
          label="Slicing Axis:"
          id="axis"
          value={axis}
          onChange={(e) => setAxis(e.target.value)}
        />

        <Dropdown
          label="Number of Slices:"
          id="slices"
          value={slices}
          onChange={(e) => setSlices(Number(e.target.value))}
        />
      </div>

      {/* PointCloud component */}
      <PointCloud data={data} slices={slices} axis={axis} />

      {/* Cut Button */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="cut-button" onClick={handleCut}>
        Cut
      </button>

      {/* Success Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default App;