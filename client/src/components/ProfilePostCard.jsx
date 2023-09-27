import React from "react"
import styles from "../assets/styles/post.module.css"
import { useState, useEffect } from "react"


const ProfilePostCard = ({ onDeletePost }) => {
  const [data, setData] = useState([])
  const [isHovering, setIsHovering] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)

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
  // const timestamp = item.createdAt
  //Convert the timestamp to a Date object
  // const dateObj = new Date(timestamp)

  // //Format the date to day/month/year
  // const formattedDate = dateObj.toLocaleDateString("en-US", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // })
  useEffect(() => {
    getData()
  }, [])
  const handleDeletePost = (postId) => {
    onDeletePost(postId)
  }
  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.length > 0 ? (
            <div className={styles.main}>
              {data.map((item, index) => {
                return (
                  <div key={index} className={styles.container}>
                    <div 
                      className={`${isHovering === index ? styles.hoverStyle : styles.h}`}
                      onMouseEnter={() => setIsHovering(index)}
                      onMouseLeave={() => setIsHovering(-1)}
                    >
                      <img
                        className={styles.image}
                        src={`https://yourfavorites-api.onrender.com/${item.image}`}
                      />
                      <a
                        href="#"
                        className={`${
                          isHovering === index ? styles.link : styles.hidden
                        }`}
                      >
                        {item.description}
                      </a>
                    </div>
                    <div className={styles.imgInfo}>
                      <h4 className={styles.title}>{item.title}</h4>
                      <span className={styles.date}>{item.createdAt}</span>
                      <i className="far fa-trash-alt">Trash</i>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No content saved yet.</div>
          )}
          </>
      )}
    </>
  )
}

export default ProfilePostCard
