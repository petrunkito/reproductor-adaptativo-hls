const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const path = require("../paths")
const ffmpegScript = require("../utilities/ffmpeg")

let controllerUploader = {}

controllerUploader.uploadFile = async (req, res) => {
    try {
        let videos = Object.keys(req.files)//?extraemos los valores de los archivos que vienen en la peticion
        let filesUploads = req.files//?almacenamos cada archivo cargado
        let elementsVideo = []//?almacena los detalles de la informacion de los archivos

        //e?ste codigo, optiene los detalles de cada archivo
        videos.forEach((file) => {
            let element = filesUploads[file]
            elementsVideo.push({
                name: element.name,
                size: element.size,
                key:file
            })
        })

        async function createFilesHLS() {
            let file = elementsVideo.shift()
            // nameFileSavedTemp = uuidv4()
            let nameFileSavedTemp = uuidv4()
            let writableStream = fs.createWriteStream(`${path.tempFile}/${nameFileSavedTemp}`)
            writableStream.write(Buffer.from(filesUploads[file.key].data))
            writableStream.end()

            let listName = []
            listName.push(nameFileSavedTemp)
            if(elementsVideo.length) listName.push(...await createFilesHLS())
            return listName
        }
        // console.log(elementsVideo)

        let listNameFiles = await createFilesHLS()
        for(let i=0;i<listNameFiles.length;i++){
            ffmpegScript(listNameFiles[i])
        }



        return res.end('ok')
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false, message: "ocurrio un error en el servidor" })
    }
}


module.exports = controllerUploader