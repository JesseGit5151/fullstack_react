import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import jwt from 'jwt-decode'
import Navbar from "./Navbar";
import AddPost from "./AddPost";
import Post from './Post'

const Posts = () => {
  const [data, setData] = useState("");
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e) => {
    e.preventDefault();
    console.log()
    //get query string
    setSearchInput(e.target.value);
  };
  const searchFilter = async() => {
    const response = await fetch(`http://localhost:3000/posts?query=${searchInput}`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        console.log(data)
        setData(data)
  }


  const navigate = useNavigate();
  //fetch data from /posts route
    async function getData() {
      try {
        const response = await fetch(`http://localhost:3000/posts`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        console.log(data.posts.length)
        setData(data)
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
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
    <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <button onClick={searchFilter}>Search</button>
      <AddPost/>
    {data.posts?.length >= 1 ? (
      <div className="container">
        {data.posts.map((item, index) => {
          return <Post key={index} item={item} getData={getData} />
        })}
      </div>
    ) : (
        <p>No Data...</p>
    )}
  </div>;
};

export default Posts;
