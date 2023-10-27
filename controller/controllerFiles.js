const modelFile = require("../model/modelFile")

let controllerFile = {}

controllerFile.getAll = async function(req, res){
    try{
        let files = await modelFile.find({})
        return res.status(200).json({ok:true, result:files})
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

controllerFile.getOne = async function(req, res){
    try{
        let _id = req.params.file
        let file = await modelFile.findOne({_id})

        if(!file) return res.status(404).json({ok:false, message:"resource not found"})
        return res.status(200).json({ok:true, result:file})
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}


module.exports = controllerFile