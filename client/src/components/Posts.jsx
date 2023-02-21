import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import jwt from 'jwt-decode'

const Posts = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  //fetch data from /posts route
    async function getData() {
      try {
        const response = await fetch(`http://localhost:3000/posts`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        console.log(data)
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
    ff
  </div>;
};

export default Posts;
