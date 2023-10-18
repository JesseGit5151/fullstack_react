const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Blog = mongoose.model("Blog", BlogSchema)

module.exports = Blog
