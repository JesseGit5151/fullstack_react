import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from '../assets/styles/login.module.css';
import image from '../assets/imgs/icons8-hide-password-50.png'
import eye from '../assets/imgs/icons8-eye-32.png'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const navigate = useNavigate();
//2
  const handleSubmit = async(e) => {
    e.preventDefault()
      let postData = await fetch(`https://yourfavorites-api.onrender.com/auth/login`, {
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
      console.log(`post data` + postData);
      let result = await postData.json();
      console.log(`resultuser` + result.user);
      if (result.user) {
        //4
        localStorage.setItem('token', result.user)
        console.log('success')
        navigate('/home')
      } else {
        console.log('unsuccessful')
      }
      console.log(result);
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Welcome Back</h1>
        
          <input type="text" value={username} onChange={(e) => {
            setUsername(e.target.value)}} placeholder='Username' required />
        
        
          <input type={isRevealPwd ? "text" : "password"} value={password} onChange={(e) => {
            setPassword(e.target.value)}} placeholder='Password' required />
          <img
          className={styles.eye}
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? image : eye}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
        
        <button type="submit">LogIn</button>
        <span>
        Don't have an account?<Link to="/">Sign up</Link>
      </span>
      </form>

      <div className={styles.regHeroImage}><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p></div>
    </div>
  )
}

export default Login