//*este modulo se encarga de subir los archivos que nos envian a nuestro servidor
//?para trabajar con el sistema de archivos
const fs = require("fs")
//?para poder unir rutas sin temer a los distintos sistemas operativos
let path = require("path")
//?usamos este modulo para obtener un identificador unico, que sera usado como nombre del archivo a subir y su carpeta
const { v4: uuidv4 } = require('uuid')
//?el modulo paths.js, nos sirve para evitar crear tantas rutas absolutas usando la variable "__dir", dandonos una menra mas directa
//?para acceder a diferentes partes del proyecto
const paths = require("../paths")
//?el modulo "eventCoordinator", que usa "EventEmiter" nos provee una manera mas facil de llevar los procesos despues de una accion
//?por ejemplo: una vez los archivos son subidos, se activa el evento "uploadedFiles", el cual nos indica que se subieron
//?los archivos, y ejecutar una accion cuando este evento aparesca como empezar a fragmentar los archivos.
const emitter = require("../utilities/eventCoordinator")


//?este objeto tendra todos los metodos almacenados en su interior, para exportarlos y luego ser ejecutados
let controllerUploader = {}

//?sube uno o varios archivos al servidor
controllerUploader.uploadFile = async (req, res) => {
    try {

        /*(req.files) obtenemos los archivos que nos mandan usando req.files que los almacena como un objeto
          y que solo pueden ser acedidos por el nombre de la propiedad: como video1, video2, etc...
        {
            video1: {
                name: 'video1.mp4',
                data: <Buffer 00 00 00 20 66 ... 11232650 more bytes>,
                size: 11232700,
                encoding: '7bit',
                tempFilePath: '',
                truncated: false,
                mimetype: 'video/mp4',
                md5: '32c6c03d62ad7916afaebd4858cde9ba',
                mv: [Function: mv]
            },
            video2: {
                name: 'video2.mp4',
                data: <Buffer 00 00 00 20 66 ... 783353 more bytes>,
                size: 783403,
                encoding: '7bit',
                tempFilePath: '',
                truncated: false,
                mimetype: 'video/mp4',
                md5: '601a9ca365dd6135aa1ab44486493bf8',
                mv: [Function: mv]
            }
        }
         */

        let videos = Object.keys(req.files)//?[video1, video2] extraemos las claves, para luego acceder a los archivos con estas mismas
        let filesUploads = req.files//?almacenamos los archivos cargados
        let elementsVideo = []//?almacena los detalles de la informacion de los archivos

        //?iteramos sobre las claves, para extraer la informacion que necesitamos de los archivos
        //?y al mismo tiempo, le asignamos el nombre de carpeta, en la que se alojara el archivo 
        videos.forEach((file) => {//file: video1, video2, ...videoN
            let element = filesUploads[file]//?ejemplo: filesUploads.video1... o req.files.video1
            elementsVideo.push({
                name: element.name,//?nombre del archivo junto con su extension
                size: element.size,//?el tamaño del archivo
                folderName: uuidv4().replace(/\-/g,""),//?el nombre de la carpeta en la que se almacenara pero sin guiones asi: '27a4b-2fac4-614a0' --> '27a4b2fac4614a0',
                key: file//?le mandamos la clave tambien [video1, video2]
            })
        })

        /*(elementsVideo) en este arreglo, almacenamos los datos de los archivos de la siguiente manera, para posteriormente
          trabajar mas comodos con ellos.
            [
                {
                    name: 'video1.mp4',
                    size: 11232700,
                    folderName: 'f9151b78a23249e8ba505c70f9bc7ad5',
                    key: 'video1'
                },
                {
                    name: 'video2.mp4',
                    size: 783403,
                    folderName: '3088f02d34694fc49ace7307bf250676',
                    key: 'video2'
                }
            ]
         */


        //?esta funcion recursiva se encargara de subir los archivos al servidor, en la carpeta "temp"
        for(let i=0;i<elementsVideo.length;i++){
            let file = elementsVideo[i]//?obtenemos la informacion preparada por nosotros
            /*(file)
            {
                name: 'video1.mp4',
                size: 11232700,
                folderName: 'f9151b78a23249e8ba505c70f9bc7ad5',
                key: 'video1'
            }
            */
            //?le indicamos que lo pondremos en la siguiente ruta(uploads/temp)
            let writableStream = fs.createWriteStream(path.join(paths.tempFile, file.folderName))
            //?extraemos los datos binarios del video de: filesUploads["video1"].data que se encuentra en un buffer
            //?y empezamos a bolcar esos datos en la direccion que queramos
            writableStream.write(filesUploads[file.key].data)
            //?utilizamos este metodo, para indicarle a nodejs, que ya no recibira mas datos, si este metodo no se pone,
            //?en el futuro no eliminara el archivo, porque estara abierto por el sistema
            writableStream.end()

        }

        //?le indicamos a emitter, que dispare el evento "uploadedFiles", que indica que los archivos ya se subieron
        //?en la carpeta temporal(uploads/temp), al mismo tiempo le mandamos la informacion de los elementos que se subieron a la carpeta
        //?como: el foldername, size, etc...
        //!la siguiente accion se ejecutara en el script "/utilities/eventCoordinator.js"
        emitter.emit("uploadedFiles", elementsVideo)

        //?mandamos una respuesta satisfactoria,
        //!Nota:"una respuesta ok, no indica que el proceso se completo, si no que se recibio la peticion"
        return res.status(202).json({ ok: true, message: "proceso finalizado" })
    } catch (err) {
        console.log("controllerPlaylist.js uploadFile err: ", err)
        return res.status(500).json({ ok: false, message: "ocurrio un error en el servidor" })
    }
}


module.exports = controllerUploader