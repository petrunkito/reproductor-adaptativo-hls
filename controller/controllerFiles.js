const modelFile = require("../model/modelFile")

let controllerFile = {}

//?con este metodo, obtenemos todos los documentos de la base de datos
controllerFile.getAll = async function(req, res){
    try{
        //?guardamos en "files" todos los elementos que se encuentra en la base de datos
        let files = await modelFile.find({})
        
        return res.status(200).json({ok:true, result:files})
    }catch(err){
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
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}


module.exports = controllerFile