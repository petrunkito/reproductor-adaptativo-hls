let express = require('express')
let routes = express.Router()
let controllerUploader = require("../../controller/controllerUploader.js")
let fs = require('fs')

routes.post("/", (req, res, next) => {
    return next()
},controllerUploader.uploadFile)

module.exports = routes