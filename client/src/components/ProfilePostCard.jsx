import React from "react"
import styles from "../assets/styles/post.module.css"
import { useState, useEffect } from "react"
import AddPost from "./AddPost"

const ProfilePostCard = () => {
  const [data, setData] = useState([])
  const [isHovering, setIsHovering] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)


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
  const timeFunc = (timestamp) => {
    const dateObj = new Date(timestamp)
    const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  return formattedDate
  }
  
  useEffect(() => {
    getData()
  }, [])
  
  
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
                      <span className={styles.date}>{timeFunc(item.createdAt)}</span>
                      <i className="far fa-trash-alt" onClick={() => handleDeletePost(item._id)}></i>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No content saved yet.</div>
          )}
          <AddPost onAddPost={handleAddPost} />
          </>
      )}
    </>
  )
}

export default ProfilePostCard
