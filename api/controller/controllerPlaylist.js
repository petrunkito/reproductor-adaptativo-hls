//* en este archivo, creamos todos los metodos necesarios para crear la logica de nuestra api
//*y manipular la informacion del modelo "Playlist" de nuestra base de datos
const modelPlaylist = require("../model/modelPlaylist")//?para trabajar con la coleccion "Playlist" de nuestra base de datos
const mongoose = require("mongoose")

//?este objeto tendra todos los metodos almacenados en su interior, para exportarlos y luego ser ejecutados
let controllerPlaylist = {}

//?obtiene la informacion de un documento
controllerPlaylist.getOne = async function(req, res){
    try{
        
        //?obtenemos el "folderName" del documento a buscar
        let folderName = req.params.folderName

        //?si el documento no se encuentra en la base de datos, enviamos la siguiente respuesta
        let element = await modelPlaylist.findOne({folderName})
        if(!element)  return res.status(404).json({ok:false, message:"resource not found"})
        /*(element) esta es la informacion que almacena "element"
            {
                _id: ObjectId("65923709fc4d2e1392a5b93d"),
                folderName: 'af06c184b33d4e4e91205b368784d1b0',
                resolutions: [ '426x240', '640x360' ],
                fragments: [
                {
                    resolution: '426x240',
                    manifest: '240p.m3u8',
                    files: [
                    { '240p_000.ts': '10.000000' },
                    { '240p_001.ts': '7.000000' }
                    ],
                    _id: ObjectId("65923709fc4d2e1392a5b93e")
                },
                {
                    resolution: '640x360',
                    manifest: '360p.m3u8',
                    files: [
                    { '360p_000.ts': '10.000000' },
                    { '360p_001.ts': '7.000000' }
                    ],
                    _id: ObjectId("65923709fc4d2e1392a5b93f")
                }
                ],
                __v: 0
            }
        */

        //?en caso de exito enviamos la siguiente respuesta
        return res.status(200).json({ok:true, message:"successful request", result:element})
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
        return res.status(200).json({ok:true, message:"successful request", result:files})
        /*(files) esto contendra la variable "files"
            [
                {
                    _id: ObjectId("65923709fc4d2e1392a5b93d"),
                    folderName: 'af06c184b33d4e4e91205b368784d1b0',
                    resolutions: [ '426x240', '640x360' ],
                    fragments: [
                    {
                        resolution: '426x240',
                        manifest: '240p.m3u8',
                        files: [
                        { '240p_000.ts': '10.000000' },
                        { '240p_001.ts': '7.000000' }
                        ],
                        _id: ObjectId("65923709fc4d2e1392a5b93e")
                    },
                    {
                        resolution: '640x360',
                        manifest: '360p.m3u8',
                        files: [
                        { '360p_000.ts': '10.000000' },
                        { '360p_001.ts': '7.000000' }
                        ],
                        _id: ObjectId("65923709fc4d2e1392a5b93f")
                    }
                    ],
                    __v: 0
                },
                {
                    _id: ObjectId("653d9adeadcc11fbfd18d001"),
                    folderName: 'dbff3a41d2884efaae885d2dd643a777',
                    resolutions: [ '426x240', '640x360' ],
                    fragments: [
                    {
                        resolution: '426x240',
                        manifest: '240p.m3u8',
                        files: [
                        { '240p_000.ts': '10.000000' },
                        { '240p_001.ts': '7.000000' }
                        ],
                        _id: ObjectId("65923709fc4d2e1392a5b93e")
                    },
                    {
                        resolution: '640x360',
                        manifest: '360p.m3u8',
                        files: [
                        { '360p_000.ts': '10.000000' },
                        { '360p_001.ts': '7.000000' }
                        ],
                        _id: ObjectId("65923709fc4d2e1392a5b93f")
                    }
                    ],
                    __v: 0
                }

            ]         
         */
    }catch(err){
        console.log("controllerPlaylist getAll err: ", err)
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}

module.exports = controllerPlaylist
