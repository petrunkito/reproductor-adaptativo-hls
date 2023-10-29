//*este modulo esta encargado de hacer posible la creacion de los archivos en el formato HLS o fragmentacion de los videos
//*en diferentes resoluciones

//?usamos el metodo "exec" para ejecutar el script "create-vod-hls.sh" que es el encargado de ejecutar las operaciones
//?para fragmentar los videos
const { exec } = require('child_process');
//?para trabajar con el sistema de archivos
const fs = require("fs/promises")
//?nos retorna las rutas absolutas donde se ubica el archivo asi: E:/documentos/escritorio/carpetaProyecto/uploader/temp/
const path = require("../paths")
//?el modulo "eventCoordinator", que usa "EventEmiter" nos provee una manera mas facil de llevar los procesos despues de una accion
//?por ejemplo: una vez los archivos son subidos, se activa el evento "uploadedFiles", el cual nos indica que se subieron
//?los archivos, y ejecutar una accion cuando este evento aparesca como empezar a fragmentar los archivos.
const emitter = require("./eventCoordinator")

//?crea los formatos Hls de un video
module.exports = async function createFormatsHls(data) {
  /*(data)
     {
        name: 'video2.mp4',
        size: 783403,
        folderName: '3088f02d-3469-4fc4-9ace-7307bf250676',
        key: 'video8'
      }
   */
  let fileName = data.folderName//?recordar que el nombre temporal de nuestro archivo es el mismo nombre de la carpeta que almacenara los fragmentos

  //?el "origin" sera donde se encuentra de manera temporal nuestro archivo, para poder fragmentarlo
  //?el "destination" sera donde se vallan a ubicar los archivos hls
  //?el metodo: `replace(/\\/g, "/")` lo que hace es reemplazar el caracter "\" por el caracter "/", esto es debido
  //?a que la ruta absoluta puede cambiar dependiendo del S.O, remplazando una ruta asi:
  //?E:\carpeta\carpeta\archivo por una asi: E:/carpeta/carpeta/archivo
  let origin = ` ${path.tempFile}/${fileName}`.replace(/\\/g, "/")
  let destination = `${path.pathFile}/${fileName}`.replace(/\\/g, "/")

  //?lo que hacemos aqui es, ejecutar el siguiente comando:
  //? create-vod-hls.sh temp/226-98n-47b(la ubicacion del archivo temporal) uploades/226-98n-47b(la nueva ubicacion del los fragmentos)
  let textComand = `${path.crateVodHls} ${origin} ${destination}`

  //?una vez termine de crear todos los archivos Hls, se ejecutara el callback
  //!Nota: el escript 'create-vod-hls.sh' detecta demanera automatica en que resoluciones se puede fragmentar el video,
  //!de modo que no crear una resolucion 4k si no la tenia desde el principio
  exec(textComand, (error) => {
    //?si ocurre un error, mandamos el siguiente mensaje
    if (error) {
      console.log("ffmpeg.js exec ocurrio un error en la creacion los archivos HLS")
    }


    //?una vez se crearon los archivos fragmentados eliminamos el video original de nuestro servidor
    fs.unlink(`${path.tempFile}/` + fileName)
      .then(() => {
        //?en caso de exito, disparamos el evento "hlsFilesCreated" que indica que los fragmentos del archivo
        //?ya se crearon, y enviamos la informacion del archivo a travez del objeto "data"
        //!la siguiente accion se ejecutara en el script "/utilities/eventCoordinator.js"
        emitter.emit("hlsFilesCreated", data)
        console.log("(ffmpeg.js unlink) proceso de eliminacion terminado")
      })
      .catch(err => {
        //?en caso de error, ejecutamos el siguiente mensaje
        console.log(`(ffmpeg.js unlink) Ocurrio un error al eliminar el archivo: `, err)
      })


  })

}
