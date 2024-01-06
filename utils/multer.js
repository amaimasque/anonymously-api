const multer  = require('multer')
const fs = require("fs")
const {makeDirectory} = require("../utils/fileManager")

const upload = multer({ 
  destination: "/uploads"
})

module.exports = {
  upload
}