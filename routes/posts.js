var express = require('express');
const { CreatePost, GetAllPosts, GetPost } = require('../controllers/PostsController');
const { authorize } = require('../middleware/auth')
const { upload } = require('../utils/multer')
var router = express.Router();

router.use(authorize)

router.post("/",  upload.single("file"), CreatePost)

router.get("/", GetAllPosts)

router.get("/:id", GetPost)

module.exports = router;
