const mongoose = require("mongoose");

//User schema: user, hash, salt, favorites [{  }]

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
});

module.exports = mongoose.model("users", userSchema);
