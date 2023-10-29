//*este archivo, se encarga de ser un orquestador de todas las apis desiponibles, 
//*aqui mandamos a llamar a todos los recursos, que seran parte de la api

//?utilizamos 'Router', para crear las diferentes apis de cada recurso
let express = require("express")
let routes = express.Router()

//?requerimos a los recursos o rutas que seran parte de nuestra api
let resourceUploader= require('./resource/resourceUploader')
let resourceFiles= require('./resource/resourceFiles')
let resourcePlaylist= require('./resource/resourcePlaylist')
let resourceFragments = require("./resource/resourceFragments")

//?cada ves que se acceda a la ruta /api, una de estas rutas se ejecutara, por ejemplo: /api/uploader ejecutara la api de subida de archivos
routes.use("/uploader", resourceUploader)//?localhost:PORT/api/uploader
routes.use("/files", resourceFiles)//?localhost:PORT/api/files
routes.use("/playlist", resourcePlaylist)//?localhost:PORT/api/playlist
routes.use("/fragments", resourceFragments)//?localhost:POST/api/fragments

//?exportamos el modulo
module.exports = routes

