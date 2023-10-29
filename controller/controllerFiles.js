//* en este archivo, creamos todos los metodos necesarios para crear la logica de nuestra api
//*y manipular la informacion del modelo "File" de nuestra base de datos
const modelFile = require("../model/modelFile")//?para trabajar con la coleccion "File" de nuestra base de datos


let controllerFile = {}

//?con este metodo, obtenemos todos los documentos de la base de datos
controllerFile.getAll = async function(req, res){
    try{
        //?guardamos en "files" todos los elementos que se encuentra en la base de datos
        let files = await modelFile.find({})
        return res.status(200).json({ok:true, result:files})
    }catch(err){
        console.log("controllerFiles getAll err: ", err)
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}

//?obtiene un archivo en particular usando el _id del documento
controllerFile.getOne = async function(req, res){
    try{
        //?obtenemos el file, atravez del _id
        let _id = req.params.id
        let file = await modelFile.findOne({_id:_id})

        //?en caso de que no se encuentre el documento, mandamos este mensaje
        if(!file) return res.status(404).json({ok:false, message:"resource not found"})

        return res.status(200).json({ok:true, result:file})
    }catch(err){
        console.log("controllerFiles getOne err: ", err)
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}


module.exports = controllerFile