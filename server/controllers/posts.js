const Users = require("../models/users")
const Post = require("../models/Posts")

const multer = require("multer")
//TODO:Create another storage for user avatars
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 1024,
    fieldSize: 50 * 1024 * 1024,
  },
  storage: storage,
}).single("image")

module.exports.getPosts = async (req, res) => {
  //search the favorites[posts]
  let user = await Users.findById(req.user.id).populate("favorites")

  let posts = user.favorites
  const { query } = req.query
  if (query) {
    //find category by query by filtering posts with the query
    posts = posts.filter((item) => {
      return item.title.toLowerCase() === query.toLowerCase()
    })
    console.log(posts)
    res.send({ posts })
  } else {
    //Find all categories
    console.log(posts)
    res.send({ posts })
  }
}
//Multer will be used in this controller
module.exports.createPost = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        res.status(300).send(err)
        console.log(err)
      } else {
        if (req.file == undefined) {
          res.status(301).send("image upload failed.")
        } else {
          //image uploaded successfully
          console.log(req.file)
          // imgPath = "uploads/" + req.file.filename;
          // storeImageLink(res, imagePath);
        }
      }
    })

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
