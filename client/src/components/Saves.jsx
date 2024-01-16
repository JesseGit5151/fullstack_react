import React, { useState, useEffect } from "react"
import styles from "../assets/styles/post.module.css"
const Saves = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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