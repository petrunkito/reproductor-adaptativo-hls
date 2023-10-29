//*cuando entren a la api (/api/uploader), este se encargara de procesar su archivo,
//*almacenarlo, convertirlo y eliminar el archivo original despues

//?cuando suben un archivo, este modulo se encarga de procesarlos y guardalos en la variable "req.files"
const fileUpload = require("express-fileupload")
//?utilizamos 'Router', para crear las diferentes metodos http con su respectiva ruta
let express = require('express')
let routes = express.Router()
let controllerUploader = require("../../controller/controllerUploader.js")//?requerimos al controlador

//?cada que se acceda a la api, usamos el middleware "fileUpload" que se encargara de procesar los archivos enviados
//?y ubicarlos en "req.files", luego ejecutamos el metodo "uploadFile" del controlador, para subir el archivo
routes.post("/",fileUpload({createParentPath:true}) ,controllerUploader.uploadFile)


module.exports = routes//?exportamos el modulo