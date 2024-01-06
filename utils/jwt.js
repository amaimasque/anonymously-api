const { sign, verify, decode } = require("jsonwebtoken")

const secret = process.env.ACCESS_TOKEN_SECRET ?? ""

const createAccessToken = (data) => {
  return sign(data, secret, {
    expiresIn: '24h'
  })
}

const checkIfValid = (token) => {
  return verify(token, secret)
}

const decodeToken = (token) => {
  return decode(token, {
    json: true
  })
}

module.exports = {
  createAccessToken,
  checkIfValid,
  decodeToken
}