const express = require("express");
const { registerUser, logInUser, logoutUser, UpdateAvatar, getUsers } = require('../controllers/auth')
const multer = require("multer")
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./userImages")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })
//Register User
router.post('/register', registerUser)
//Get login page
router.post('/login', logInUser)
//Get logged in user
router.get('/users', getUsers)
//Update User Avatar
router.post('/avatar', upload.single('avatar'),UpdateAvatar)
//For when user logs in
router.post('/logout', logoutUser)

module.exports = router