const express = require("express");
const { getPosts, createPost, deletePost } = require('../controllers/posts')
const router = express.Router()
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
})

router.get('/', getPosts)
router.post('/',upload.single('image'), createPost)
router.delete('/:id', deletePost)
module.exports = router