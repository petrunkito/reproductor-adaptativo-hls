const modelPlaylist = require("../model/modelPlaylist")
const paths = require("../paths")
const fs = require("fs")

let controllerPlaylist = {}


controllerPlaylist.getOne = async function(req, res){
    try{
        let _id = req.params.id
        let element = modelPlaylist.findOne({_id})
        if(!element)  return res.status(404).json({ok:false, message:"resource not found"})

        return res.status(200).json({ok:true, result:element})
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

controllerPlaylist.getFragment = async function(req, res){
    try{

        let {pos=0, resolution} = req.body

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
