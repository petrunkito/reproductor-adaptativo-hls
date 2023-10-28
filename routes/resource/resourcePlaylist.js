let express = require('express')
let routes = express.Router()
let controllerPlaylist = require("../../controller/controllerPlaylist")


routes.get("/", controllerPlaylist.getAll)
routes.get("/:id", controllerPlaylist.getOne)

module.exports = routes