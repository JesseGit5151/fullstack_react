import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "../assets/styles/Navbar.module.css"
import { FaUserAlt } from 'react-icons/fa'
import { useEffect, useState } from "react"
import jwt from "jwt-decode"
import Modal from "@material-ui/core/Modal"

const Navbar = () => {
  const [user, setUser] = useState("")
  //dropdown
  const [openProfile, setOpenProfile] = useState(false)
  //modal
  const [open, setOpen] = useState(false)
  //Image state
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  async function fetchUser() {
    try {
      const response = await fetch(`https://yourfavorites-api.onrender.com/auth/users`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      const user = await response.json()
      setUser(user)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  //handle click of image
  const handleClick = () => {
    setOpenProfile((prev) => !prev)
  }

  //UseEffect to call fetch function on page load
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const user = jwt(token)
      if (!user) {
        localStorage.removeItem("token")
        navigate("auth/login")
      } else {
        console.log("success")
        fetchUser()
      }
    }
  }, [])

  //UpdateAvatar component will replace <img> below
  const navigate = useNavigate()
  const logout = () => {
    const clearCacheData = () => {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    };
    clearCacheData()
    localStorage.clear()
    window.location.href = '/auth/login'
    //navigate('/auth/login', { replace: true })
  }
  
  const changeAvatar = (e) => {
    //TODO:When user clicks 'change avatar', modal will pop up with form to ipdate image
    setOpen(true)
  }

  const profileView = () => {
    navigate("/profile")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const avatarFormData = new FormData()
    avatarFormData.append("avatar", image)

    try {
      let postData = await fetch(`https://yourfavorites-api.onrender.com/auth/avatar`, {
        method: "POST",
        crossDomain: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: avatarFormData,
      })
      if (!postData.ok) {
        throw new Error(`HTTP error! status: ${postData.status}`)
      }

      handleClose()
      handleClick()
      let result = await postData.json()
      setUser((prevUser) => ({
        ...prevUser,
        user: result.avatar,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <nav className={styles.nav}>
      {user && (
        <p className={styles.p}>Welcome Back, {user.name.split(" ")[0]}!</p>
      )}

      <img
        id="lo"
        className={styles.img}
        src={`https://yourfavorites-api.onrender.com/${user.user}`}
        alt="avatar"
        onClick={handleClick}
      />
      {openProfile && (
        <div className={styles.dropDown}>
          <ul>
            <li onClick={changeAvatar}>
              <i className="fas fa-images"></i>Update avatar
            </li>
            <Modal
              // BackdropProps={{
              //   style: {
              //     backdropFilter: `blur(9px)`,
              //   },
              // }}
              className={styles.modal}
              onClose={handleClose}
              open={open}
            >
              <div
                className={styles.inner}
              >
                <h1 className={styles.h1}>Update Avatar</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <label htmlFor="avatar">Image:</label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      onChange={handleImageChange}
                      required
                    />
                  <button className={styles.btn} type="submit">Add</button>
                </form>
              </div>
            </Modal>
            <li onClick={profileView} >
            <i className="fa-solid fa-user"></i>Profile
            </li>
            <li onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
            </li>
          </ul>
        </div>
      )}

      {/* <button className={styles.btn} onClick={logout}>Logout</button> */}
    </nav>
  )
}

export default Navbar
