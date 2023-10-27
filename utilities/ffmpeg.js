
const { exec } = require('child_process');
const fs = require("fs/promises")
const path = require("../paths")
const emitter = require("./eventCoordinator")

module.exports = async function createFormatsHls(data) {
  let fileName = data.folderName
  let textComand = "create-vod-hls.sh "
  let origin = ` ${path.tempFile}/${fileName}`.replace(/\\/g, "/")
  let destination = `${path.pathFile}/${fileName}`.replace(/\\/g, "/")

  textComand = `${path.crateVodHls} ${origin} ${destination}`

  exec(textComand, (error) => {
    if (error) {
      console.log("(ffmpeg.js unlink) ocurrio un error en la creacion los archivos HLS")
    }


    fs.unlink(`${path.tempFile}/` + fileName)
      .then(() => {
        emitter.emit("hlsFilesCreated", data)
        console.log("(ffmpeg.js unlink) proceso de eliminacion terminado")
      })
      .catch(err => {
        console.log(`(ffmpeg.js unlink) Ocurrio un error al eliminar el archivo: `, err)
      })


  })

}
