import React, { useState } from "react"
import styles from "../assets/styles/searchbar.module.css"
const Searchbar = ({ searchInput, setSearchInput, onSearch }) => {
//Just set the search query & pass as prop to Posts - don't worry about data state(Posts)
const handleChange = (e) => {
  //get query string
  console.log(e.target.value)
  setSearchInput(e.target.value);
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    onSearch(searchInput);
  }
};
  

  return (
    <div className={styles.searcbarContainer}>
      <div className={styles.chevron}></div>
      <h2 className={styles.title}>Daily Discoveries</h2>
      <input
      className={styles.searchbar}
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
        // onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Searchbar
