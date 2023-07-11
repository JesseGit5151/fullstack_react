import React, { useState } from "react"
import styles from "../assets/styles/searchbar.module.css"
const Searchbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('')
//Just set the search query & pass as prop to Posts - don't worry about data state(Posts)
const handleChange = (e) => {
  //get query string
  setSearchInput(e.target.value);
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    onSearch(searchInput);
  }
};
  

  return (
    <div className={styles.searcbarContainer}>
      <h2 className={styles.title}>Search</h2>
      <span className={styles.span}>All your favorites in one place!</span>
      <input
      className={styles.searchbar}
        type="text"
        placeholder="Search your favorites"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
        // onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Searchbar
