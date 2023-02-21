const express = require("express");
const { registerUser, logInUser, logoutUser } = require('../controllers/auth')
const router = express.Router()

//Register User
router.post('/register', registerUser)
//Get login page
router.post('/login', logInUser)
//For when user logs in
router.post('/logout', logoutUser)

module.exports = router