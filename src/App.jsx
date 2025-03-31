import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PointCloud from './components/PointCloud';

function App() {
  const [data, setData] = useState([]);
  const [slices, setSlices] = useState(1); // State for the number of slices

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

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Floating UI for selecting slices */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        <label htmlFor="slices">Number of Slices:</label>
        <select
          id="slices"
          value={slices}
          onChange={(e) => setSlices(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* PointCloud component */}
      <PointCloud data={data} slices={slices} />
    </div>
  );
}

export default App;