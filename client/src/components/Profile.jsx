import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Post from "./Post"
const Profile = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //call fetch to retreive personal posts
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
      setIsLoading(false)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  useEffect(() => {

    getData()
}, [])
  return (
    <div>
      <Navbar/>
      {/* create a div for the tags: profile - saved - settings */}
      <ul>
        <li>Profile</li>
        <li>Saves</li>
        <li>Settings</li>
        </ul>
      {/* create a div for the content displayed */}
      <div>{isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.length > 0 ? (
            <div>
              {/* Render your data here */}
              {data.map((item, index) => {
             return <Post key={index} item={item}/>
           })}
            </div>
          ) : (
            <div>No content saved yet.</div>
          )}
        </div>
      )}</div>
    </div>
  )
}

export default Profile