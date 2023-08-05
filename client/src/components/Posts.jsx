import React from "react";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import jwt from 'jwt-decode'
import Post from './Post'
import styles from '../assets/styles/Posts.module.css';
import Feed from './Feed'
const Posts = ({ data, getData, onDeletePost }) => {

  const handleDeletePost = (postId) => {
    
    onDeletePost(postId)
  }

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
    <Feed />
    {data.length >= 1 ? (
      <div className={styles.main}>
        {data.map((item, index) => {
          return <Post key={index} item={item} onDeletePost={handleDeletePost}/>
        })}
      </div>
    ) : (
        <p>Loading...</p>
    )}
  </div>;
};

export default Posts;
