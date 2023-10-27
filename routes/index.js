let express = require("express")
let routes = express.Router()

let resourceUploader= require('./resource/resourceUploader')
let resourceFiles= require('./resource/resourceFiles')
let resourcePlaylist= require('./resource/resourcePlaylist')

routes.use("/uploader", resourceUploader)
routes.use("/files", resourceFiles)
routes.use("/playlist", resourcePlaylist)

module.exports = routes