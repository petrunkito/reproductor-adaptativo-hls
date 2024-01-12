//*este modulo esta encargado de hacer posible la creacion de los archivos en el formato HLS o fragmentacion de los videos
//*en diferentes resoluciones

//?usamos el metodo "exec" para ejecutar el script "create-vod-hls.sh" que es el encargado de ejecutar las operaciones
//?para fragmentar los videos
const { exec } = require('child_process');
//?para trabajar con el sistema de archivos
const fs = require("fs/promises")
const path = require("path")
//?nos retorna las rutas absolutas donde se ubica el archivo asi: E:/documentos/escritorio/carpetaProyecto/uploader/temp/
const paths = require("../paths")
//?el modulo "eventCoordinator", que usa "EventEmiter" nos provee una manera mas facil de llevar los procesos despues de una accion
//?por ejemplo: una vez los archivos son subidos, se activa el evento "uploadedFiles", el cual nos indica que se subieron
//?los archivos al servidor, y ejecutar una accion cuando este evento aparesca como empezar a fragmentar los archivos.
const emitter = require("./eventCoordinator")

//?crea los formatos Hls de un video
module.exports = async function createFormatsHls(data) {
  /*(data)
     {
        name: 'video2.mp4',
        size: 783403,
        folderName: '3088f02d34694fc49ace7307bf250676',
        key: 'video8'
      }
   */
  //?este es el nombre del archivo que se subio al servidor, y es el mismo nombre que tendra la carpeta donde se almacenaran los 
  //?diferentes fragmentos del video
  let fileName = data.folderName

  //?el "origin" sera donde se encuentra de manera temporal nuestro archivo, para poder fragmentarlo.
  //?el "destination" sera donde se vallan a ubicar los archivos hls.
  //?usamos el modulo de "path" para unir las rutas y esta decida si usara la "/" o "\" dependiendo del sistema operativo
  let origin = path.join(paths.tempFile, fileName)
  let destination = path.join(paths.pathFile, fileName)

  //?lo que hacemos aqui es, ejecutar el siguiente comando:
  //? create-vod-hls.sh temp/22698n47b(la ubicacion del archivo temporal) uploades/22698n47b(la nueva ubicacion del los fragmentos)
  let textComand = `${paths.createVodHls} ${origin} ${destination}`

  //?una vez termine de crear todos los archivos Hls, se ejecutara el callback
  //!Nota: el escript 'create-vod-hls.sh' detecta demanera automatica en que resoluciones se puede fragmentar el video,
  //!de modo que no puede crear una resolucion 4k si no la tenia desde el principio
  let isOk = true
  exec(textComand, async (err) => {
    try {
      //?si ocurre un error, mandamos el siguiente mensaje
      if (err) {
        console.log("ffmpeg.js exec ocurrio un error en la creacion los archivos HLS: ", err)
        isOk = false
      }

      //?eliminamos el archivo que se subio al servidor en la carpeta "temp"
      await fs.rm(path.join(paths.tempFile, fileName), { recursive: true, force: true, maxRetries: 5, retryDelay: 5000 })

      //?si no ocurrio ningun error, emitimos el evento "hlsFilesCreated", para que cree los registros en la base de datos
      //?indicando la informacion de los archivos subidos y fragmentados.
      if (isOk) emitter.emit("hlsFilesCreated", data)
      console.log("(ffmpeg.js unlink) proceso de eliminacion terminado")
    } catch (err) {
      //?en caso de error, ejecutamos el siguiente mensaje
      console.log(`(ffmpeg.js unlink) Ocurrio un error al eliminar el archivo: `, err)
    }
  })

}
