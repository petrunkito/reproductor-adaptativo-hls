const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const path = require("../paths")
const ffmpegScript = require("../utilities/ffmpeg")
const emitter = require("../utilities/eventCoordinator")

let controllerUploader = {}

controllerUploader.uploadFile = async (req, res) => {
    try {

        //!------procesos(esta parte del codigo nos sirve para ver que procesos se llevaron correctamente, en un caso de error)
        //!ver que procesos se ejecutaron, y poder resolver el problema
        let subirArchivos = false
        let crearArchivosHls = false
        let crearRegistroFile = false
        let crearRegistroPlaylist = false
        //!------

        let videos = Object.keys(req.files)//?extraemos los valores de los archivos que vienen en la peticion multipart
        let filesUploads = req.files//?almacenamos cada archivo cargado
        let elementsVideo = []//?almacena los detalles de la informacion de los archivos

        //ennste codigo, optiene los detalles de cada archivo
        videos.forEach((file) => {
            let element = filesUploads[file]
            elementsVideo.push({
                name: element.name,
                size: element.size,
                folderName: uuidv4(),
                key: file
            })
        })
        

        let iterador = 0
        async function uploadFiles() {
            let file = elementsVideo[iterador]
            let writableStream = fs.createWriteStream(`${path.tempFile}/${file.folderName}`)
            writableStream.write(Buffer.from(filesUploads[file.key].data))
            writableStream.end()
            iterador++

            if (elementsVideo.length !== iterador) await uploadFiles()
        }

        await uploadFiles()

        emitter.emit("uploadedFiles",elementsVideo)     

        return res.status(200).json({ok:true, message:"proceso finalizado"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false, message: "ocurrio un error en el servidor" })
    }
}


module.exports = controllerUploader