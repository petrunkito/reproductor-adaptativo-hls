//* en este archivo, creamos todos los metodos necesarios para crear la logica de nuestra api
//*y manipular la informacion del modelo "Playlist" de nuestra base de datos
const modelPlaylist = require("../model/modelPlaylist")//?para trabajar con la coleccion "Playlist" de nuestra base de datos
const paths = require("../paths")//?utilizaremos nuestras rutas por defecto
const fs = require("fs")//?para manipular los archivos de nuestro servidor

let controllerPlaylist = {}

//?obtiene la informacion de un documento
controllerPlaylist.getOne = async function(req, res){
    try{
        //?obtenemos el _id del recurso
        let folderName = req.params.folderName
        let element = await modelPlaylist.findOne({folderName})
        //?si el documento no se encuentra en la base de datos, ejecutamos la siguiente linea
        if(!element)  return res.status(404).json({ok:false, message:"resource not found"})

        return res.status(200).json({ok:true, result:element})
    }catch(err){
        console.log("controllerPlaylist geOne err: ", err)
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}

//?con este metodo, obtenemos todos los documentos de la base de datos
controllerPlaylist.getAll = async function(req, res){
    try{
        //?guardamos en "files" todos los elementos que se encuentra en la base de datos
        let files = await modelPlaylist.find({})
        return res.status(200).json({ok:true, result:files})
    }catch(err){
        console.log("controllerPlaylist getAll err: ", err)
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}

module.exports = controllerPlaylist
