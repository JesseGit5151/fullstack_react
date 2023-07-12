import React from "react"
import { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { FaPlus, FaRegCheckCircle } from "react-icons/fa"
import styles from "../assets/styles/addPost.module.css"

const AddPost = ({ onAddPost }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [success, setSuccess] = useState(false)

  const clearSuccessMessage = () => {
    setSuccess(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userFormData = new FormData()
    userFormData.append("title", title)
    userFormData.append("description", description)
    userFormData.append("image", image)
    try {
      let postData = await fetch(`https://yourfavorites-api.onrender.com/posts`, {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
      },
      body: userFormData,
    })
    console.log(postData)
    let result = await postData.json()
    console.log(result)

    if (result) {
      onAddPost(result)
      setTitle("")
      setDescription("")
      setImage("")
      handleClose()
      setSuccess(true)
      setTimeout(clearSuccessMessage, 3000)
    }
    } catch (error) {
      console.error(error)
    }
    
  }
  return (
    <div>
      {success && (
        <>
          <FaRegCheckCircle className={styles.success} />
          <div className={styles.successtext}>Successfully Added!</div>
        </>
      )}
      <FaPlus className={styles.add} onClick={handleOpen} />

      <Modal onClose={handleClose} open={open} className={styles.modal}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>Add Post</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
            placeholder="Entry name..."
            className={styles.title}
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
            placeholder="Describe your new entry.."
            className={styles.desc}
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              required
            />

            <label htmlFor="image">Image:</label>
              <input
              className={styles.fileUpload}
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            <button className={styles.btn} type="submit">Add</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddPost
