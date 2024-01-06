const fs = require("fs")

const makeDirectory = (path) => new Promise((resolve, reject) => {
  fs.mkdir(path, (err) => {
    if (err) reject(err)
    resolve(true)
  })
})

module.exports = {
  makeDirectory,
}