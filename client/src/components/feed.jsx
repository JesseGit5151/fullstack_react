import React from 'react'
import { useEffect, useState } from "react"
import Post from './Post'
import styles from '../assets/styles/Posts.module.css';
//Get all users posts - need to create a public/private setting on posts to determine what can go in the feed
const Feed = ({ searchInput }) => {

    const [data, setData] = useState([])
    const getFeed = async(searchInput = "")=> {
        let feedData = await fetch(`https://yourfavorites-api.onrender.com/posts/feed?query=${searchInput}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          let data = await feedData.json()
          console.log(data)
          setData(data)
    }
    useEffect(() => {

        getFeed(searchInput)
    }, [searchInput])
  return (
    <div>{data.length >= 1 ? (
        <div className={styles.main}>
          {data.map((item, index) => {
            return <Post key={index} item={item}/>
          })}
        </div>
      ) : (
          <p>Loading...</p>
      )}</div>
  )
}

export default Feed