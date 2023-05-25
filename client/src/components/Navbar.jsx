import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "../assets/styles/Navbar.module.css"

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
      const response = await fetch(`http://localhost:3000/auth/users`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      const user = await response.json()
      console.log(user)
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
    localStorage.clear()
    navigate("/auth/login")
  }

  const changeAvatar = (e) => {
    //TODO:When user clicks 'change avatar', modal will pop up with form to ipdate image
    setOpen(true)
    console.log(e.target)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const avatarFormData = new FormData()
    avatarFormData.append('avatar', image)
    console.log(avatarFormData)
    try {
      let postData = await fetch(`http://localhost:3000/auth/avatar`, {
        method: "POST",
        crossDomain: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: avatarFormData,
      })
      console.log(postData)
      if (!postData.ok) {
        throw new Error(`HTTP error! status: ${postData.status}`);
      }

      handleClose()
      handleClick()
      let result = await postData.json()
      console.log(result)
      setUser((prevUser) => ({
        ...prevUser,
        user: result.avatar,
      }))
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className={styles.nav}>

      <p className={styles.p}>Welcome Back, {user.name}</p>
      <img
      id="lo"
        className={styles.img}
        src={`http://localhost:3000/${user.user}`}
        alt="avatar"
        onClick={handleClick}
      />
      {openProfile && (
        <div className={styles.dropDown}>
          <ul>
            <li onClick={changeAvatar}>
              <i className="fas fa-images"></i>change avatar
            </li>
            <Modal
              BackdropProps={{
                style: {
                  backdropFilter: `blur(9px)`,
                },
              }}
              onClose={handleClose}
              open={open}
              style={{
                position: "absolute",
                border: "2px solid #000",
                backgroundColor: `rgba(0, 0, 0, 0.7)`,
                boxShadow: "2px solid black",
                height: 80,
                margin: "auto",
              }}
            >
              <div style={{ backgroundColor: "white", borderRadius: `7px`, width: `50%`, margin: `auto` }}>
                <h1>Add Avatar</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="avatar">
                    Image:
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                  <button type="submit">Add</button>
                </form>
              </div>
            </Modal>
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
