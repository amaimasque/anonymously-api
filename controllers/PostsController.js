const prisma = require('../utils/databaseClient');
const { comparePassword } = require('../utils/encryption');
const { createAccessToken } = require('../utils/jwt');
const isEmpty = require('lodash/isEmpty');
const {CustomError} = require("../types/custom")
const {storage} = require("../utils/firebaseClient");

const CreatePost = async (req, res) => {
  try {
    const {thought} = req.body
    const file = req.file

    const newFileName = Date.now() + file?.originalname
    const userId = res.locals.userId

    if (!file && !thought) throw new CustomError("Add a thought or media", 400)
    if (file) await storage.file(newFileName).save(file.buffer)

    const newThought = await prisma.thought.create({
      data: {
        photo: file && file.mimetype.includes("image") ? newFileName : null,
        video: file && file.mimetype.includes("video") ? newFileName : null,
        post: thought ?? null,
        userId
      }
    })

    return res.status(201).json({
      data: newThought,
      message: "Successfully created a post"
    })

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Unable to create post"
    })
  }
}

const GetAllPosts = async (req, res) => {
  try {
    const thoughts = await prisma.thought.findMany({
      include: {
        user: {
          select: {
            username: true
          }
        },
      },
    })

    return res.status(200).json({
      data: thoughts,
      message: "Successfully get all posts"
    })

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Unable to get all posts"
    })
  }
}

const GetPost = async (req, res) => {
  try {
    const {id} = req.params
    const thought = await prisma.thought.findUnique({
      where: {
        id: +id,
      }
    })

    if (!thought) throw new CustomError("Post not found", 404)
    
    return res.status(200).json({
      data: thought,
      message: `Successfully get post with ID ${id}`
    })

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Unable to get post"
    })
  }
}

module.exports = {
  CreatePost,
  GetAllPosts,
  GetPost
}