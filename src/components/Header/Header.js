import React, { useState } from 'react';
import './Header.css';

const Header = ({ setCity }) => {
  const [inputValue, setInputValue] = useState(""); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setCity(inputValue);
    setInputValue(""); 
  };

  return (
    <div className="header">
      <p className="title">Weather App</p>
      <h4>To Know about the Today's Weather</h4>
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter the Location"
          value={inputValue} 
          onChange={handleInputChange} // Handle input change
        />
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i> 
        </button>
      </form>
    </div>
  );
}

export default Header;
