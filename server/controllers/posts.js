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
const upload = multer({ storage: storage }).single('image')

module.exports.getPosts = async (req, res) => {
  let posts = await Post.find({ author: req.user.id })
  //search the favorites[posts]
  const { query } = req.query
  if (query) {
    console.log(query);
    //find category by query by filtering posts with the query
    posts = posts.filter((item) => {
      return item.title.toLowerCase() === query.toLowerCase()
    })
    res.send({ posts })
  } else {
    //Find all categories
    console.log(query);
    res.send({ posts })
  }
}
//Multer will be used in this controller
module.exports.createPost = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        res.status(300).send(err);
        console.log(err);
      } else {
        if (req.file == undefined) {
          res.status(301).send("image upload failed.");
        } else {
          //image uploaded successfully
          console.log(req.file)
          // imgPath = "uploads/" + req.file.filename;
          // storeImageLink(res, imagePath);
        }
      }
    });
    
    const user = await Users.findById(req.user.id)
    //Create Post then save
    //console.log(user)
    const { title, description } = req.body
    //Capitalize title before saving to database
    const uppercaseTitle = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    const newPost = new Post({
      title: uppercaseTitle,
      description: description,
      image: `images/${req.file.filename}`,
      author: req.user.id,
    })
    //  await user.populate('favorites')
    await newPost.save()
  
    user.favorites.push(newPost)
    await user.save()
  
    Users.findById(user)
      .populate("favorites")
      .exec((err, userWithFavorites) => {
        if (err) {
          console.log(err)
        } else {
          console.log(userWithFavorites)
        }
      })
    
    res.send(newPost)
  } catch (error) {
    console.log(error)
  }
  
}

module.exports.deletePost = async (req, res) => {
  let { id } = req.params;

  Post.findByIdAndRemove(id).exec((error, deletedItem) => {
    if (error) {
      console.log(error);
    }
    return res.send(deletedItem);
  });
}
