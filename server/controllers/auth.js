const Users = require("../models/users");
const Post = require("../models/Posts");
const { hashSync, compareSync } = require('bcrypt');

const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
  //get user form information
  let { username, password } = req.body;
  try {
    //Make sure username is unique
    Users.findOne({ username: username }, async function (err, result) {
      if (err) throw err;
      if (result) {
        console.log(`User already exists. Please pick a different name.`);
      } else {
        //encrypt password[ TODO ]
        const encryptedPassword = hashSync(password, 10);
        //Create new User
        const newUser = new Users({
          username: username,
          password: encryptedPassword,
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
    res.json({ status: "ok", user: `Bearer ${token}`, username: user.username });
  } else {
    res.json({ status: "bad" });
  }
  
};

const logoutUser = async (req, res) => {
  res.send("logoutUser");
};

module.exports = {
  registerUser,
  logInUser,
  logoutUser,
};
