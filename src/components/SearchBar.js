import React from "react";
import "./styles/SearchBar.css";

const SearchBar = () => {
  const toggleSearchBar = () => {
    const bar = document.querySelector(".searchbar");
    if (bar.classList.contains("active")) {
      bar.classList.remove("active");
    } else {
      bar.classList.add("active");
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <label for="search-date">Date:</label>
        <input type="text" id="search-date" />

        <label for="search-description">Description:</label>
        <input type="text" id="search-description" />

        <label for="search-department">Department:</label>
        <input type="text" id="search-department" />
      </div>
      <button type="button" onClick={toggleSearchBar}>
        <i class="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
