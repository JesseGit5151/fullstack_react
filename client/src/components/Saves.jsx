import React, { useState, useEffect } from "react"

const Saves = () => {
  const [likes, setLikes] = useState([])
  //Fetch saves
  async function getLikes() {
    try {
      const response = await fetch(
        `https://yourfavorites-api.onrender.com/posts/likes`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type":"application/json",
          },
        }
      )
      const data = await response.json()
      console.log(data)
      setLikes(data)
    } catch (error) {
      console.error("An error occurred:", error)
    }

  }
  useEffect(() => {
    getLikes()
  }, [])
  //map through data
  return (
    <div>Saves{likes}</div>
  )
}

export default Saves