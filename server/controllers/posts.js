const Users = require("../models/users")
const Post = require("../models/Posts")


module.exports.getFeed = async (req, res) => {
  let feed = await Post.find().populate("author")
  // console.log(feed[0].author)
  const { query } = req.query
  if (query) {
    //find category by query by filtering posts with the query
    feed = feed.filter((item) => {
      return item.title.toLowerCase().includes(query.toLowerCase())
    })
    
    res.send( feed )
  } else {
    //Find all categories
    
    res.send( feed )
  }
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
//Send the liked id to users saves array
module.exports.likePosts = async (req, res) => {
  //the id of the liked post will be added to Post{refer to createpost function}
  //Will also be added to Users saves array
  //grab id of liked post
  console.log(req.body.postId)
  //get users saves array
  const user = await Users.findById(req.user.id)
  //check if id of liked post exist in users saves array
  if(user.likedPosts.includes(req.body.postId)) {
    console.log('true: already included')
  } else {
    console.log(req.body.postId)
    user.likedPosts.push(req.body.postId)
    await user.save()
    console.log('false: not included')
  }
  //if true: remove that id from saves array(dislike)
  //if false: add that post array to the users saves array
  //return that post id
  res.send({ message: user.likedPosts})
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
