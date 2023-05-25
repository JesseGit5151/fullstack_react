const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const postRoutes = require("./routes/posts")
const authRoutes = require("./routes/auth")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const cors = require("cors")

const app = express()
app.use(express.json())
//Setup Mongodb
const db = require("./config/database")
//Tell app what to use
app.use("/images", express.static("images"));
app.use("/userImages", express.static("userImages"));
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())
app.use(passport.initialize())

require("./config/passport")
const PORT = process.env.PORT

// Assuming you have an express middleware to verify JWTs and add the user data to the request object
app.use((req, res, next) => {
  // Verify the JWT and add the user data to the request object
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  
  if (token) {
    try {
      const user = jwt.verify(token, "secret")
      req.user = user
      
    } catch (err) {
      // Handle invalid or expired JWT
      res.status(401).send("Unauthorized")
      return
    }
  }
  next()
})

//Routes
app.use("/auth", authRoutes)
app.use("/posts", postRoutes)

app.listen(PORT, () => {
  console.log("hello")
})
