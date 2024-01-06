const { CustomError } = require("../types/custom")
const { checkIfValid, decodeToken } = require("../utils/jwt")

const authorize = (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) throw new CustomError("Unauthorized access", 401)

    const token = auth.split(" ")[1]
    const tokenInfo = decodeToken(token)
    const verify = checkIfValid(token)

    console.log(tokenInfo)

    if (!verify) throw new CustomError("Access forbidden", 403)

    res.locals.userId =  tokenInfo.userId

    next()
  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      message: error.message ?? "Internal server error"
    })
  }
}

module.exports = {
  authorize
}