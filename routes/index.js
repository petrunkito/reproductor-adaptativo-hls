let express = require("express")
let routes = express.Router()

let resourceUploader= require('./resource/resourceUploader')

routes.use("/uploader", resourceUploader)

module.exports = routes