const express = require("express");
const { registerUser, logInUser, logoutUser, UpdateAvatar, getUsers } = require('../controllers/auth')
const router = express.Router()

//Register User
router.post('/register', registerUser)
//Get login page
router.post('/login', logInUser)
//Get logged in user
router.get('/users', getUsers)
//Update User Avatar
router.post('/avatar', UpdateAvatar)
//For when user logs in
router.post('/logout', logoutUser)

module.exports = router