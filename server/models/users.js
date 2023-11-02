const mongoose = require("mongoose");

//User schema: user, hash, salt, favorites [{  }]
//Add saves as an array
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog', // Reference to the Post model
    }],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
});

module.exports = mongoose.model("users", userSchema);
