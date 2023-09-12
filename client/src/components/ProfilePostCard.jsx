import React from 'react'
import styles from "../assets/styles/post.module.css"
import { useState } from "react"

const ProfilePostCard = ({ item, onDeletePost }) => {
    const [isHovering, setIsHovering] = useState(false)
    // const timestamp = item.createdAt
  // Convert the timestamp to a Date object
// const dateObj = new Date(timestamp);

// Format the date to day/month/year
// const formattedDate = dateObj.toLocaleDateString("en-US", {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric"
// });

const handleMouseEnter = (e) => {
    setIsHovering(true)
  }
  
  const handleMouseLeave = (e) => {
    setIsHovering(false)
  }
  return (
    <div className={styles.container}>
      {/* add height: 300px & border-radius: inherit; */}
      <div className={`${isHovering ? styles.hoverStyle : styles.h}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* <img className={styles.image} src={`https://yourfavorites-api.onrender.com/${item.image}`} />
      <a href='#' className={`${isHovering ? styles.link : styles.hidden}`}>{item.description}</a>
      </div>
      <div className={styles.imgInfo}>
      <h4 className={styles.title}>
      {item.title}
      </h4> */}
      {/* <span className={styles.date}>{formattedDate}</span> */}
      </div>
    </div>
  )
}

export default ProfilePostCard