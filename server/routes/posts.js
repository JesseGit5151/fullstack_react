const express = require("express");
const { getPosts, createPost, deletePost, getFeed, likePosts, getSaves } = require('../controllers/posts')
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/images")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({
  maxSize: 50 * 1024 * 1024, // 50MB
  storage: storage,
})
router.get('/feed', getFeed)
router.get('/', getPosts)
router.get('/saves', getSaves)
router.put('/likes', likePosts)
router.post('/',upload.single('image'), createPost)
router.delete('/:id', deletePost)
module.exports = router