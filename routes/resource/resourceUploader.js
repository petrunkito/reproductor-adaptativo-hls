let express = require('express')
let routes = express.Router()
let controllerUploader = require("../../controller/controllerUploader.js")


routes.post("/",controllerUploader.uploadFile)

module.exports = routes