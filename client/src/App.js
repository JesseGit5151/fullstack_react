import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Feed from "./components/feed"
import Profile from "./components/Profile"
import AddPost from "./components/AddPost"
import ProtectedRoute from "./components/ProtectedRoute"
import Searchbar from "./components/Searchbar"
import Navbar from "./components/Navbar"

//Search bar does not fetch anything - it just sets the query state - which is passed in to Posts as a prop
//refactor the getdata function so that it takes in a parameter(query)

function App() {
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const handleSearch = (query) => {
    setSearchInput(query)
  }

  //TODO:setSuccess and pass down to this function
  const handleAddPost = (newData) => {
    // Once successful, update the local state with the new post
    setData([...data, newData])
  }

  const handleDeletePost = async (postId) => {
    try {
      console.log(postId)
      await fetch(`https://yourfavorites-api.onrender.com/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })

      // Filter out the post with the given postId
      const updatedData = data.filter((post) => post._id !== postId)
      console.log(updatedData)
      setData(updatedData)
    } catch (error) {
      console.log("Error deleting post:", error)
    }
  }
  //fetch data from /posts route
  async function getData(query = "") {
    try {
      const response = await fetch(
        `https://yourfavorites-api.onrender.com/posts?query=${query}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Cache-Control": "no-store",
          },
        }
      )
      const data = await response.json()
      console.log(data)
      setData(data)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Searchbar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
              />
              <Feed searchInput={searchInput} />
            </>
          }
        />
        <Route path="/profile" element={<Profile onDeletePost={handleDeletePost} />}></Route>
      </Routes>
    </div>
  )
}

export default App
