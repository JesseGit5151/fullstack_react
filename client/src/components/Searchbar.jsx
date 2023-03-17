import React from "react"
import { useState } from "react"
const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e) => {
    e.preventDefault();
    console.log()
    //get query string
    setSearchInput(e.target.value);
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

    </div>
  )
}

export default Searchbar
