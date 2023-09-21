import React from "react"
import styles from "../assets/styles/post.module.css"
import { useState, useEffect } from "react"

const ProfilePostCard = ({ onDeletePost }) => {
  const [data, setData] = useState([])
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
//   const timestamp = item.createdAt
//   //Convert the timestamp to a Date object
//   const dateObj = new Date(timestamp)

//   //Format the date to day/month/year
//   const formattedDate = dateObj.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   })

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
  const handleDeletePost = (postId) => {
    onDeletePost(postId)
  }
  const handleMouseEnter = (e) => {
    setIsHovering(true)
  }

  const handleMouseLeave = (e) => {
    setIsHovering(false)
  }
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.length > 0 ? (
            <div className={styles.main}>
              {data.map((item, index) => {
                return (
                  <div className={styles.container}>
                    <div key={index}
                      className={`${isHovering ? styles.hoverStyle : styles.h}`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        className={styles.image}
                        src={`https://yourfavorites-api.onrender.com/${item.image}`}
                      />
                      <a
                        href="#"
                        className={`${
                          isHovering ? styles.link : styles.hidden
                        }`}
                      >
                        {item.description}
                      </a>
                    </div>
                    <div className={styles.imgInfo}>
                      <h4 className={styles.title}>{item.title}</h4>
                      {/* <span className={styles.date}>{formattedDate}</span> */}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No content saved yet.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfilePostCard
