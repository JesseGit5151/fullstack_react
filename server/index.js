const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const passport = require('passport');
const cors = require("cors");


const app = express()
app.use(express.json());
//Setup Mongodb
const db = require("./config/database");
//Tell app what to use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(passport.initialize())

require('./config/passport')
const PORT = process.env.PORT


//Routes
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)


app.listen(3000, () => {
    console.log('hello')
})