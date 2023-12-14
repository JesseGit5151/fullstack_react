import React, { useState, useEffect } from "react"

const Saves = () => {
  const [data, setData] = useState([])
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
      setData(data)
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
      <div>
        {data.map((item, index) => {
          return <div key={index}>
            <div>{item}</div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Saves