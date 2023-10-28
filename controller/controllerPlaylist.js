const modelPlaylist = require("../model/modelPlaylist")
const paths = require("../paths")
const fs = require("fs")

let controllerPlaylist = {}

//?obtiene la informacion de un documento
controllerPlaylist.getOne = async function(req, res){
    try{
        //?obtenemos el _id del recurso
        let _id = req.params.id
        let element = await modelPlaylist.findOne({_id})
        //?si el documento no se encuentra en la base de datos, ejecutamos la siguiente linea
        if(!element)  return res.status(404).json({ok:false, message:"resource not found"})

        return res.status(200).json({ok:true, result:element})
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

//?con este metodo, obtenemos todos los documentos de la base de datos
controllerPlaylist.getAll = async function(req, res){
    try{
        //?guardamos en "files" todos los elementos que se encuentra en la base de datos
        let files = await modelPlaylist.find({})
        
        return res.status(200).json({ok:true, result:files})
    }catch(err){
        return res.status(500).json({ok:false, message:"an error ocurred with the server"})
    }
}


//?obtiene un fragmento de un video, en la resolucion que lo soliciten,
controllerPlaylist.getFragment = async function(req, res){
    try{

        //?los parametros que se necesitan son la posicion del archivo ejemplo: 
        //?pos=2 con ["240_000p.ts", "240_001p.ts", "240_p002.ts"] nos devuelve el archivo "240_p002.ts"
        //?y la resolucion en la que desean el archivo
        let {pos=0, resolution} = req.body
        if(!resolution) return res.status(400).json({ok:false, message: "all fields are required"})

        let _id = req.params.id
        let element = modelPlaylist.findOne({_id})
        if(!element) return res.status(404).json({ok:false, message:"resource not found"})

        let fragments = element.fragments
        let elementFilter = ""
        for(let i=0;i<fragments.length;i++){
            let element = fragments[i]

            if(element.resolution === resolution && element.files[pos]){
                elementFilter = element
                break
            }
        }
        if(!elementFilter) return res.status(404).json({ok:false, message:"resource not found"})


        async function isFileExist(){
            try{
                let  resultado = await fs.stat(`${paths.pathFile}/${element.folderName}`)
                return await resultado.isFile()
            }catch(err){
                console.log(err)
                return false
            }
        }

        if(!await isFileExist() ) return res.status(404).json({ok:false, message:"resource not found"})

        let readableStream = fs.createReadStream(`${paths.pathFile}/${element.folderName}/${elementFilter.files[pos]}`)

        return readableStream.pipe(res)
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

// controllerPlayList.getSeveralFragments = async function(req, res){

// }


module.exports = controllerPlaylist
