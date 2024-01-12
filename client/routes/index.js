const express = require("express")
const routes = express.Router()

const home = require("./resource/home.js")
const video = require("./resource/video")
const page404 = require("./resource/page404")

routes.get("/", home)
routes.get("/video", video)
routes.use(page404)

// routes.use((req, res, next)=>{
//     res.status(404).send("recurso no encontrado")
//     // next()
// })

module.exports = routes
