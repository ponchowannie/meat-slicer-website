import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Meat Slicer Visualization</h1>
      <nav className="app-menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;