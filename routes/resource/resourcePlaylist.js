//*cuando entren a la api (/api/playlist) dependiendo del metodo que lo hicieron(get, post, put, delete)
//*y la ruta se ejecutara algun metodo del controlador "controllerPlaylist"

//?usamos express para el manejo de las rutas y mandamos a llamar a su respectivo controlador
let express = require('express')
let routes = express.Router()
let controllerPlaylist = require("../../controller/controllerPlaylist")

//?obtiene la informacion de un documento
routes.get("/", controllerPlaylist.getAll)
//?con este metodo, obtenemos todos los documentos de la base de datos
routes.get("/:folderName", controllerPlaylist.getOne)

module.exports = routes