const modelFile = require("../model/modelFile")

let controllerFile = {}

controllerFile.find = async function(req, res){
    try{

    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

controllerFile.findOne = async function(){
    try{

    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}


module.exports = controllerFile