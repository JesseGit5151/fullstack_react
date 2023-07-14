const Users = require("../models/users");
const Post = require("../models/Posts");
const { hashSync, compareSync } = require('bcrypt');
const multer = require("multer")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")


const registerUser = async (req, res) => {
  //get user form information
  let { username, password } = req.body;
  try {
    //Make sure username is unique
    Users.findOne({ username: username }, async function (err, result) {
      if (err) throw err;
      if (result) {
        const alreadyExist = `User already exists. Please pick a different name.`
        res.send({ alreadyExist })
      } else {
        //encrypt password[ TODO ]
        const encryptedPassword = hashSync(password, 10);
        //Create new User
        const newUser = new Users({
          username: username,
          password: encryptedPassword,
          avatar: `userImages/001-user.png`,
          favorites: []
        });
        //Save new User
        await newUser.save();
        res.send({ status: "ok" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//3
const logInUser = async (req, res) => {
  //Get login info: username & password
  let { username, password } = req.body;
  // Look up user in database
  const user = await Users.findOne({ username });
  
  if (!user) {
    return res.status(401).send({
        success: false,
        message: "Could not find the user."
    })
}
if (!compareSync(password, user.password)) {
  return res.status(401).send({
    success: false,
    message: "Incorrect password."
})
}
  
  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      "secret"
    );
    //4
    res.json({ status: "ok", user: `Bearer ${token}`, username: user.username,avatar: user.avatar });
  } else {
    res.json({ status: "bad" });
  }
  
};
const getUsers = async (req, res) => {
  const user = await Users.findById(req.user.id)
  console.log(user)
  res.send({ user: user.avatar, name: user.username })
};
const UpdateAvatar = async (req, res) => {
  console.log(req.user.id)
  try {
    if (!req.file) {
      console.log('dfdf')
      return res.status(400).send('No file uploaded.');
    }
    const imagePath = req.file.filename
    console.log(`userImages/${imagePath}`)
    const updatedUser = await Users.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar: `userImages/${imagePath}` } },
      { new: true }
    )
    
    res.send(updatedUser);
  } catch (error) {
    console.log(error)
  }

};


const logoutUser = async (req, res) => {
  req.logout()
  res.send("logoutUser");
};

module.exports = {
  registerUser,
  logInUser,
  logoutUser,
  UpdateAvatar,
  getUsers,
};
