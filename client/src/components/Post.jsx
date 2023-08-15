import React from 'react'
import styles from "../assets/styles/post.module.css"
import { useState } from "react"
import { FaRegTrashAlt } from 'react-icons/fa';
const Post = ({ item, onDeletePost }) => {
  const [isHovering, setIsHovering] = useState(false)
  const timestamp = item.createdAt
  // Convert the timestamp to a Date object
const dateObj = new Date(timestamp);

// Format the date to day/month/year
const formattedDate = dateObj.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

const handleMouseEnter = (e) => {
  setIsHovering(true)
}

const handleMouseLeave = (e) => {
  setIsHovering(false)
}
  // const handleClick = async () => {
  //   onDeletePost(item._id);
  // }


  return (
    <div className={styles.container}>
      
      <img className={styles.image} src={`https://yourfavorites-api.onrender.com/${item.image}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
      <a href='#' className={`${isHovering ? '': styles.hidden}`}>{item.description}</a>
      <div className={styles.imgInfo}>
      <img className={styles.avatar} src={`https://yourfavorites-api.onrender.com/${item.author.avatar}`} />
      <h3 className={styles.author}>{item.author.username}</h3>
      <h4 className={styles.title}>
      {item.title}
      </h4>
      {/* <p className={styles.p}>{item.description}</p> */}
      <span className={styles.date}>{formattedDate}</span>
      </div>
      {/* <FaRegTrashAlt className={styles.deletebutton} onClick={handleClick}/> */}
      {/* <button className={styles.button} onClick={handleClick}>trash</button> */}
    </div>
  )
}

export default Post