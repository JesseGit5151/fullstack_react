import React from "react"
import { useState } from "react"
import Modal from "@material-ui/core/Modal"

const AddPost = ({ onAddPost }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userFormData = new FormData()
    userFormData.append('title', title)
    userFormData.append('description', description)
    userFormData.append('image', image)
    let postData = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: userFormData,
    })
    let result = await postData.json()
    console.log(result)
    onAddPost(result)
    setTitle('')
    setDescription('')
    setImage('')
    handleClose()
  }
  return (
    <div>
      <button type="button" onClick={handleOpen} style={{border:`none`, backgroundColor:`transparent`, cursor:`pointer`, position:`absolute`, right:`5%`}}>
      <i className="fa fa-plus-square" style={{fontSize: `36px`}}></i>Enter new
      </button>
      <Modal
        onClose={handleClose}
        open={open}
        style={{
          position: "absolute",
          backgroundColor: `rgba(0, 0, 0, 0.7)`,
          boxShadow: "2px solid black",
          height: "50vh",
          width: "80vw",
          margin: "auto",
        }}
      >
        <div style={{ backgroundColor: `white`,width: "inherit", height: "inherit" }}>
          <h1>Add Post</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                required
              />
            </label>
            <label htmlFor="image">
              Image:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddPost
