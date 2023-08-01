const Users = require("../models/users")
const Post = require("../models/Posts")


module.exports.getFeed = async (req, res) => {
  let feed = await Post.find()
  res.send(feed)
}

module.exports.getPosts = async (req, res) => {
  //search the favorites[posts]
  let user = await Users.findById(req.user.id).populate("favorites")
  res.setHeader('Cache-Control', 'no-store'); // or 'no-cache' for more flexibility
  let posts = user.favorites
  const { query } = req.query
  if (query) {
    //find category by query by filtering posts with the query
    posts = posts.filter((item) => {
      return item.title.toLowerCase() === query.toLowerCase()
    })
    console.log(posts)
    res.send( posts )
  } else {
    //Find all categories
    console.log(posts)
    res.send( posts )
  }
}
//Multer will be used in this controller
module.exports.createPost = async (req, res) => {
  try {

    const user = await Users.findById(req.user.id)

    //Create Post then save
    const { title, description } = req.body
    //Capitalize title before saving to database
    const uppercaseTitle = title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    )
    const newPost = new Post({
      title: uppercaseTitle,
      description: description,
      image: `images/${req.file.filename}`,
      author: req.user.id,
    })

    newPost.save()
    Users.findByIdAndUpdate(
      req.user.id,
      { $push: { favorites: newPost._id } },
      { new: true },
      (err, updatedItem) => {
        if (err) {
          console.log(err)
        } else {
          res.send(newPost)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports.deletePost = async (req, res) => {
  let { id } = req.params

  Post.findByIdAndRemove(id).exec((error, deletedItem) => {
    if (error) {
      console.log(error)
    }
    return res.send(deletedItem)
  })
}
