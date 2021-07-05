import React from "react";
import "./styles/SearchBar.css";

const SearchBar = (props) => {
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
        <label for="search-description">Description:</label>
        <input
          type="text"
          id="search-description"
          onChange={(e) => {
            props.setSearchDesc(e.target.value);
          }}
        />

        <label for="search-date">Date:</label>
        <input
          type="text"
          id="search-date"
          onChange={(e) => {
            props.setSearchDate(e.target.value);
          }}
        />

        <label for="search-department">Department:</label>
        <input
          type="text"
          id="search-department"
          onChange={(e) => {
            if (e.target.value === "Quality" || e.target.value === "quality") {
              props.setSearchDept("0");
            } else if (
              e.target.value === "Management" ||
              e.target.value === "management"
            ) {
              props.setSearchDept("1");
            } else if (
              e.target.value === "Sales" ||
              e.target.value === "sales"
            ) {
              props.setSearchDept("2");
            } else {
              props.setSearchDept("");
            }
          }}
        />
      </div>

      <button type="button" onClick={toggleSearchBar}>
        <i class="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
