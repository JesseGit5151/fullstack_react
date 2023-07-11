import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import styles from '../assets/styles/register.module.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let postData = await fetch(`https://yourfavorites-api.onrender.com/auth/register`, {
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
      if(result.alreadyExist) {
        setError(result.alreadyExist)
      } else {
        navigate('/auth/login');
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Create an account</h1>
      {error && <div className={styles.error}>{error}</div>}
        <input type="text" name="username" value={username} onChange={(e) => {
            setUsername(e.target.value)
          }} placeholder='Username' required />
        
        <input type="text" name="password" value={password} onChange={(e) => {
            setPassword(e.target.value)}} placeholder='Password' required />
        <button type="submit">Create account</button>
        <span>
        Already have an account?<Link to="auth/login">Login</Link>
      </span>
      </form>

      <div className={styles.regHeroImage}><p>"Connecting the world, one post at a time"</p></div>
    </div>
  );
};
export default Register;
