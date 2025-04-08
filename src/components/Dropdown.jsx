import React from "react";
import "./Dropdown.css";

const Dropdown = ({ label, id, value, onChange }) => {
  const options = id === "axis"
    ? [
        { value: "x", label: "X-Axis" },
        { value: "y", label: "Y-Axis" },
      ]
    : [
        { value: 1, label: "None" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
      ];

  return (
    <div className="dropdown-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange} className="dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;