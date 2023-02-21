const mongoose = require("mongoose");

//User schema: user, hash, salt, favorites [{  }]

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("users", userSchema);
