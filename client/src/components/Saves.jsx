import React, { useState, useEffect } from "react"

const Saves = () => {
  const [likes, setLikes] = useState([])
  //Fetch saves
  async function getLikes() {
    try {
      const response = await fetch(
        `https://yourfavorites-api.onrender.com/posts/saves`,
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
    <div>Saves
      {data.length >= 1 ? (
      <div className={styles.main}>
        {data.map((item, index) => {
          return <div key={index}>{item} </div>
        })}
      </div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
  )
}

export default Saves