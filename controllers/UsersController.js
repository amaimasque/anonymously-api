const prisma = require('../utils/databaseClient');
const { comparePassword } = require('../utils/encryption');
const { createAccessToken } = require('../utils/jwt');
const isEmpty = require('lodash/isEmpty');
const {CustomError} = require("../types/custom")

const Login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (isEmpty(user)) throw new CustomError("User not found", 404)
    if (isEmpty(username) || isEmpty(password)) throw new CustomError("Invalid request", 400)

    const isCorrectPassword = await comparePassword(user?.password, password)

    if (!isCorrectPassword) throw new CustomError("Incorrect password", 400)

    const accessToken = createAccessToken({
      userId: user.id,
      username: username,
    })

    await prisma.user.update({
      data: {
        accessToken
      },
      where: {
        id: user.id,
        username
      }
    })

    res.cookie("access", accessToken, {maxAge: 60 * 60 * 24, httpOnly: process.env.APP_ENV !== "dev", secure: process.env.APP_ENV === "dev"})

    return res.status(200).json({
      data: accessToken,
      message: "Successfully logged in user"
    })

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Unable to login user"
    })
  }
}

const Logout = async (req, res) => {
  try {
    res.clearCookie("access", {maxAge: 60 * 60 * 24, httpOnly: process.env.APP_ENV !== "dev", secure: process.env.APP_ENV === "dev"})
    return res.status(200).json({
      message: "Successfully logged out"
    })

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Unable to logout user"
    })
  }
}


module.exports = {
  Login,
  Logout
}