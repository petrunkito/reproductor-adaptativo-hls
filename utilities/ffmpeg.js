
const { exec } = require('child_process');
const fs = require("fs/promises")
const path = require("../paths")

module.exports = async function createFormatsHls(fineName, fineNameExit) {

  let textComand = "create-vod-hls.sh "
  let origin = ` ${path.tempFile}/${fineName}`.replace(/\\/g, "/") 
  let destination =  `${path.pathFile}/${fineName}`.replace(/\\/g, "/") 

  textComand = `${path.crateVodHls} ${origin} ${destination}`
  exec(textComand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return;
    }

    fs.unlink(`${path.tempFile}/`+fineName).then(data=>{
      console.log("proceso terminado")
    })

    console.log('proceso terminado', stdout, stderr)
  })

}
