const modelPlaylist = require("../model/modelPlaylist")

let controllerPlaylist = {}

controllerPlaylist.find = async function(req, res){
    try{

    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

controllerPlaylist.findOne = async function(){
    try{

    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}


module.exports = controllerPlaylist