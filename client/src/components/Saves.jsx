import React, { useState, useEffect } from "react"
import styles from "../assets/styles/post.module.css"
const Saves = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const heartClick = async (id) => {
    //when clicked, that card id will be fetched{put} to backend where it will be added to saves array
    //when fetch update is successful, heart color state will be updated
    try {
      let postData = await fetch(`https://yourfavorites-api.onrender.com/posts/likes`, {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type":"application/json",
          Authorization: localStorage.getItem("token"),
        },
        body:JSON.stringify({
          postId: id
      })
      })
      //You will filter out the disliked card and use that updated filtered list to update state
      const updatedData = data.filter((post) => post._id !== id)
      console.log(updatedData)
      setData(updatedData)
      await postData.json()
    } catch (error) {
      console.error(error)
    }
    //will also change color of heart while icon is being clicked
    
  }




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
      setIsLoading(false)
    } catch (error) {
      console.error("An error occurred:", error)
    }

  }
  useEffect(() => {
    getLikes()
    
  }, [])
  //map through data
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
                
                    >
                      <img
                        className={styles.image}
                        src={`https://yourfavorites-api.onrender.com/${item.image}`}
                      />
                      <a
                        href="#"
                        
                      >
                        {item.description}
                      </a>
                    </div>
                    <div className={styles.imgInfo}>
                      <h4 className={styles.title}>{item.title}</h4>
                      <i onClick={()=>{heartClick(item._id)}} className="fas fa-heart"></i>
                      <span >{item.createdAt}</span>
                      
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


    // <div>Saves
    //   <div>
    //     {data.map((item, index) => {
    //       return <div key={index}>
    //         <div>{item.title}</div>
    //       </div>
    //     })}
    //   </div>
    // </div>
  )
}

export default Saves