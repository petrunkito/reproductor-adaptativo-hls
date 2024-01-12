//* en este archivo, creamos todos los metodos necesarios para crear la logica de nuestra api
//*y manipular la informacion del modelo "File" de nuestra base de datos
const modelFile = require("../model/modelFile")////?el modelo de la coleccion modelplaylist "file"
const modelPlaylist = require("../model/modelPlaylist.js")//?el modelo de la coleccion modelplaylist
const paths = require("../paths.js")//?modulo que nos permitira ir a rutas especificas en nuestro servidor de manera mas facil
const { rm } = require('fs/promises');//?para eliminar archivos de nuestro servidor
const path = require("path")//?para manejar las rutas correctamente
const mongoose = require("mongoose")

//?este objeto tendra todos los metodos almacenados en su interior, para exportarlos y luego ser ejecutados
let controllerFile = {}

//?con este metodo, obtenemos todos los documentos de la base de datos
controllerFile.getAll = async function (req, res) {
    try {
        //?guardamos en "files" todos los elementos que se encuentra en la base de datos
        let files = await modelFile.find({})
        return res.status(200).json({ ok: true, result: files })
        /*(files) esta es la informacion que contendra la variable "files"

        [
            {
                _id: ObjectId("65923709fc4d2e1392a5b93b"),
                nameFile: 'petrunkito.mp4',
                size: '783403',
                folderName: 'af06c184b33d4e4e91205b368784d1b0',
                __v: 0
            },
            {
                _id: ObjectId("65923709fc4d2e1392a5b93b"),
                nameFile: 'savage.mp4',
                size: '965563',
                folderName: '37e1ead9e467436c9501dde3c1d41b3d',
                __v: 0
            }
        ]
         
        */
    } catch (err) {
        console.log("controllerFiles getAll err: ", err)
        return res.status(500).json({ ok: false, message: "an error ocurred with the server" })
    }
}

//?obtiene un documento en particular usando el _id del documento
controllerFile.getOne = async function (req, res) {
    try {
        //?obtenemos el _id del documento a buscar
        let _id = new mongoose.Types.ObjectId(req.params.id)

        //?buscamos el documento, y en caso de que no se encuentre mandamos la siguiente respuesta
        let file = await modelFile.findOne({ _id })
        if (!file) return res.status(404).json({ ok: false, message: "resource not found" })
        /*
            {
                _id: ObjectId("65923709fc4d2e1392a5b93b"),
                nameFile: 'petrunkito.mp4',
                size: '783403',
                folderName: 'af06c184b33d4e4e91205b368784d1b0',
                __v: 0
            }
        */
        //?en caso de exito enviamos la siguiente respuesta
        return res.status(200).json({ ok: true, message: "successful request", result: file })
    } catch (err) {
        console.log("controllerFiles.js getOne err: ", err)
        return res.status(500).json({ ok: false, message: "an error ocurred with the server" })
    }
}

//?elimina un documento en particular en la base de datos usando el _id y ademas de eliminar los fragmentos del video en el servidor
controllerFile.delete = async function (req, res) {
    try {

        //?obtenemos el _id del documento a eliminar
        let _id = new mongoose.Types.ObjectId(req.params.id)

        //?buscamos el documento, y en caso de que no se encuentre mandamos la siguiente respuesta
        let file = await modelFile.findOne({ _id: _id })
        if (!file) return res.status(404).json({ ok: false, message: "resource not found" })
        /*
            {
                _id: ObjectId("65923709fc4d2e1392a5b93b"),
                nameFile: 'petrunkito.mp4',
                size: '783403',
                folderName: 'af06c184b33d4e4e91205b368784d1b0',
                __v: 0
            }
        */

        //!Nota: eliminamos el video de la base de datos y de la carpeta que almacena los fragmentos del video

        //?primero, eliminamos los registros de la base de datos, para luego eliminarlo del servidor
        await modelPlaylist.findOneAndDelete({ folderName: file.folderName })//?eliminamos el registro de la coleccion "playlist"
        await modelFile.deleteOne({ _id: _id })//?eliminamos el registro de la coleccion "file"

        //?eliminamos la carpeta que almacena los fragmentos del video, y usuamos la opcion "recursive" en "true"
        //?(pero si eliminamos carpetas estas tienen que estar vacias
        //?por eso usamos "recursive" en "true" para eliminar la carpeta y los archivos que tenga a dentro)
        await rm(path.join(paths.pathFile, file.folderName), { recursive: true })

        //?si todo es exitoso, enviamos la siguiente respuesta
        return res.status(200).json({ ok: true, message: "file deleted successfully" })

    } catch (err) {
        console.log("controllerFiles.js delete err: ", err)
        return res.status(500).json({ ok: false, message: "an error occurred while deleting the video" })
    }
}

module.exports = controllerFile