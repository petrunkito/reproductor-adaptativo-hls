const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
let ffmpegScript = require("../utilities/ffmpeg")

let controllerUploader = {}

controllerUploader.uploadFile = async (req, res) => {
    try {
        let videos = Object.keys(req.files)//?estraemos los valores de los archivos que vienen en la peticion
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

        console.log(elementsVideo)

        //!aurelio ya creamos los archivos, no hay necesidad de poner la extension
        //!hay que seguir con el otro proceso

        async function createFilesHLS() {
            let file = elementsVideo.shift()
            // nameFileSavedTemp = uuidv4()
            let nameFileSavedTemp = uuidv4()
            let writableStream = fs.createWriteStream(`${__dirname}/../uploads/temporal/${nameFileSavedTemp}`)
            writableStream.write(Buffer.from(filesUploads[file.key].data))

            let listName = []
            listName.push(nameFileSavedTemp)
            if(elementsVideo.length) listName.push(...await createFilesHLS())
            return listName
        }
        // console.log(elementsVideo)

        let listNameFiles = await createFilesHLS()
        console.log(listNameFiles[0])
        for(let i=0;i<listNameFiles.length;i++){
            await ffmpegScript(listNameFiles[i])
        }






        // let archivo = fs.createWriteStream("./archivo.mp4")
        // let body = []
        // req.on('data', (chunk) => {
        //     // console.log(chunk)
        //     // archivo.write(chunk)

        // }).on("end", ()=>{
        //     // archivo.end()
        //     console.log("hola mundo")
        //     // return res.end("ok")
        // })
        // let readableStream = fs.createReadStream("E:/Documentos/Documentos/AMV1/Linkin Park - In The End (Mellen Gi & Tommee Profitt Remix).mp4")
        // // let writableStream = fs.createWriteStream(`${__dirname}/../uploads/arhivo.mp4`)
        // let writableStream = fs.createWriteStream(`${__dirname}/../uploads/archivo.mp4`)

        // readableStream.pipe(writableStream)
        // readableStream.on("end", e=>{
        //     console.log("termino")
        //     return res.end("ok")
        // })


        return res.end('ok')
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false, message: "ocurrio un error en el servidor" })
    }
}


module.exports = controllerUploader