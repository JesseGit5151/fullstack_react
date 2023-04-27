import React from "react";
import { useNavigate  } from "react-router-dom";
import styles from '../assets/styles/Navbar.module.css';
import { UpdateAvatar } from "./UpdateAvatar";
import { useEffect, useState } from "react";
import jwt from 'jwt-decode'

const Navbar = () => {
  const [user, setUser] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  //TODO: will fetch user and display avatar in navbar
  async function fetchUser() {
    try {
      const response = await fetch(`http://localhost:3000/auth/users`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const user = await response.json();
      console.log(user)
      setUser(user)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  //handle click of image
  const handleClick = () => {
    setOpenProfile((prev) => !prev)
  }


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
        fetchUser()
      }
    }
  }, []);

  //UpdateAvatar component will replace <img> below
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  const changeAvatar = () => {
    //TODO:When user clicks 'change avatar', modal will pop up with form to ipdate image
  }

  return (
    <nav className={styles.nav}>
      {/* <UpdateAvatar /> */}
      <img
        className={styles.img} 
        src={`http://localhost:3000/${user.user}`} 
        alt='avatar'
        onClick={handleClick}
        />
        {
          openProfile && <div className={styles.dropDown}>
          <ul>
            <li onClick={changeAvatar}><i className='fas fa-images'></i>change avatar</li>
            <li onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</li>
          </ul>
        </div>
        }
        
      {/* <button className={styles.btn} onClick={logout}>Logout</button> */}
    </nav>
  );
};

export default Navbar;
