let express = require('express')
let routes = express.Router()
let controllerPlaylist = require("../../controller/controllerPlaylist")


routes.get("/:id", controllerPlaylist.getOne)
routes.get("/:id/fragments", controllerPlaylist.getFragment)

module.exports = routes