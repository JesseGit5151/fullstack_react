import React from "react"
import styles from "../assets/styles/post.module.css"
import { useState } from "react"

const Post = ({ item }) => {
  //Create state for heart color changed f
  const [isHovering, setIsHovering] = useState(false)
  const timestamp = item.createdAt
  // Convert the timestamp to a Date object
  const dateObj = new Date(timestamp)

  // Format the date to day/month/year
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const handleMouseEnter = (e) => {
    setIsHovering(true)
  }

  const handleMouseLeave = (e) => {
    setIsHovering(false)
  }
  // const handleClick = async () => {
  //   onDeletePost(item._id);
  // }
  const heartClick = async (id) => {
    //when clicked, that card id will be fetched{put} to backend where it will be added to saves array
    //when fetch update is successful, heart color state will be updated
    try {
      let postData = await fetch(`https://yourfavorites-api.onrender.com/posts/likes`, {
        method: "PUT",
        crossDomain: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body:JSON.stringify({
          postId: id
      })
      })
      
      await postData.json()
    } catch (error) {
      console.error(error)
    }
    //will also change color of heart while icon is being clicked
    console.log(item._id)
  }

  return (
    <div className={styles.container}>
      {/* add height: 300px & border-radius: inherit; */}
      <div
        className={`${isHovering ? styles.hoverStyle : styles.h}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className={styles.image}
          src={`https://yourfavorites-api.onrender.com/${item.image}`}
        />
        <a href="#" className={`${isHovering ? styles.link : styles.hidden}`}>
          {item.description}
        </a>
      </div>
      <div className={styles.imgInfo}>
        <img
          className={styles.avatar}
          src={`https://yourfavorites-api.onrender.com/${item.author.avatar}`}
        />
        <h3 className={styles.author}>{item.author.username}</h3>
        <h4 className={styles.title}>{item.title}</h4>
        <i onClick={()=>{heartClick(item._id)}} className="fas fa-heart"></i>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  )
}

export default Post
