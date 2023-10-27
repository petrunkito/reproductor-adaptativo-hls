let express = require('express')
let routes = express.Router()
let controllerFiles = require("../../controller/controllerFiles")

routes.get("/", controllerFiles.getAll)
routes.get("/:file", controllerFiles.getOne)

module.exports = routes