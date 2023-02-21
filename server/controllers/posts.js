const Users = require('../models/users')
const Post = require('../models/Posts')


module.exports.getPosts = async (req, res) => {
    let allPosts = await Post.find()
    res.send(['df', 'dfdf', 'erere'])
}

module.exports.createPost = async (req, res) => {
    //Create Post then save
    console.log('create post')
    res.send('hello')
}

module.exports.updatePost = async (req, res) => {
    //Get post id and update

    console.log('update post')
    res.send('hello')
}

module.exports.deletePost = async (req, res) => {
    //Get post id and delete
    console.log('delete post')
    res.send('hello')
}
