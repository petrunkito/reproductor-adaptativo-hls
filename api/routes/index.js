//*este archivo, se encarga de ser un orquestador de todas las apis desponibles, 
//*aqui mandamos a llamar a todos los recursos, que seran parte de la api

//?utilizamos 'Router', para crear las diferentes apis de cada recurso
let express = require("express")
let routes = express.Router()

//?requerimos a los recursos o rutas que seran parte de nuestra api
let resourceUploader= require('./resource/resourceUploader')//?encargada de subir archivos
let resourceFiles= require('./resource/resourceFiles')//?encargada de proveer informacion simple de los archivos subidos
let resourcePlaylist= require('./resource/resourcePlaylist')//?encargada de enviarnos informacion de los fragmentos(duracion, cantidad, resoluciones)
let resourceFragments = require("./resource/resourceFragments")//?encargada de enviarnos fragmentos de video

//?cada ves que se acceda a la ruta /api, una de estas rutas se ejecutara, por ejemplo: /api/uploader ejecutara la api de subida de archivos
routes.use("/uploader", resourceUploader)//?http://127.0.0.1:PORT/api/uploader
routes.use("/files", resourceFiles)//?http://127.0.0.1:PORT/api/files
routes.use("/playlist", resourcePlaylist)//?http://127.0.0.1:PORT/api/playlist
routes.use("/fragments", resourceFragments)//?http://127.0.0.1:PORT/api/fragments

//?exportamos el modulo
module.exports = routes

