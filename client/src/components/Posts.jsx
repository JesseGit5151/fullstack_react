import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import jwt from 'jwt-decode'
import Navbar from "./Navbar";
import Post from './Post'
import styles from '../assets/styles/Posts.module.css';

const Posts = ({ data, getData, onDeletePost }) => {
  
  // const [data, setData] = useState("");
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e) => {
    e.preventDefault();
    //get query string
    setSearchInput(e.target.value);
  };

  const handleDeletePost = (postId) => {
    console.log(postId)
    onDeletePost(postId)
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const response = await fetch(`http://localhost:3000/posts?query=${searchInput}`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        
        // setData(data)
    }
  };


  const navigate = useNavigate();
//UseEffect to call fetch function on page load
  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt(token)
      if(!user) {
        localStorage.removeItem('token')
        navigate('auth/login')
      } else{
        console.log('success')
        
        getData()
      }
    }
  }, []);

  //Map through data to display
  return <div>
    <Navbar />
    <div className={styles.searcbarContainer}>
    <h2 className={styles.title}>Search</h2>
    <span className={styles.span}>All your favorites in one place!</span>
    <input
    className={styles.searcbar}
        type="text"
        placeholder="Search your favorites"
        onChange={handleChange}
        value={searchInput}
        onKeyDown={handleKeyDown}
      />
    </div>
    
      {/* <button onClick={searchFilter}>Search</button> */}
      {/* <AddPost/> */}
    {data.length >= 1 ? (
      <div className={styles.main}>
        {data.map((item, index) => {
          return <Post key={index} item={item} onDeletePost={handleDeletePost}/>
        })}
      </div>
    ) : (
        <p>No Data...</p>
    )}
  </div>;
};

export default Posts;
