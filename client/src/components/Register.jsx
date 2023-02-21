import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //e.preventDefault();
    navigate('/auth/login');
    try {
      let postData = await fetch(`http://localhost:3000/auth/register`, {
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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => {
            setUsername(e.target.value)
          }} required />
        </label>
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => {
            setPassword(e.target.value)}} required />
        </label>
        <button type="submit">Create account</button>
      </form>
      <span>
        Already have an account?<Link to="auth/login">Login</Link>
      </span>
    </div>
  );
};
export default Register;
