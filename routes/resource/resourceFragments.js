//*cuando entren a la api (/api/fragments) dependiendo del metodo que lo hicieron(get, post, put, delete)
//*y la ruta se ejecutara algun metodo del controlador "controllerFragments"

//?usamos express para el manejo de las rutas y mandamos a llamar a su respectivo controlador
let express = require('express')
let routes = express.Router()
let controllerFragments = require("../../controller/controllerFragments")

//?obtiene un fragmento en la resolucion deseada
routes.get("/:folderName", controllerFragments.getFragments)

module.exports = routes