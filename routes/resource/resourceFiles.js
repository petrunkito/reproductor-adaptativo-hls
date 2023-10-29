//*cuando entren a la api (/api/files) dependiendo del metodo que lo hicieron(get, post, put, delete)
//*y la ruta se ejecutara algun metodo del controlador "controllerFiles"

//?usamos express para el manejo de las rutas y mandamos a llamar a su respectivo controlador
let express = require('express')
let routes = express.Router()
let controllerFiles = require("../../controller/controllerFiles")

//?con este metodo, obtenemos todos los documentos de la base de datos
routes.get("/", controllerFiles.getAll)
//?obtiene un archivo en particular usando el _id del documento
routes.get("/:id", controllerFiles.getOne)

module.exports = routes