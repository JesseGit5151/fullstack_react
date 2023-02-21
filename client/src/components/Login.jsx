import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
//2
  const handleSubmit = async(e) => {
    e.preventDefault()
      let postData = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(postData);
      let result = await postData.json();
      console.log(result.user);
      if (result.user) {
        //4
        localStorage.setItem('token', result.user)
        console.log('success')
        navigate('/posts')
      } else {
        console.log('unsuccessful')
      }
      console.log(result);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Welcome Back</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => {
            setUsername(e.target.value)}} required />
        </label>
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => {
            setPassword(e.target.value)}} required />
        </label>
        <button type="submit">LogIn</button>
      </form>
    </>
  )
}

export default Login