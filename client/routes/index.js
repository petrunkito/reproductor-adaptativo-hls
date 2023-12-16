const express = require("express")
const routes = express.Router()

const home = require("./resource/home.js")
const video = require("./resource/video")

routes.get("/", home)
routes.get("/video", video)

module.exports = routes