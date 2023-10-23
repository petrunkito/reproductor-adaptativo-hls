
module.exports = async function createFormatsHls(filePath, filePathExit) {
  const { exec } = require('child_process');
  const fs = require("fs/promises")

  let textComand = "create-vod-hls.sh "
  let origin = ` ${__dirname}/../uploads/temporal/${filePath }`.replace(/\\/g, "/") 
  let destination =  ` ${__dirname}/../uploads/${filePath} `.replace(/\\/g, "/") 

  textComand = `${__dirname}/../create-vod-hls.sh ${origin} ${destination}`

  // textComand = `create-vod-hls.sh uploads/temp/video.mp4 uploads/video.mp4`//.replace(/\\/g, "/")                                    

  // console.log("*********************************************")
  // console.log(textComand)
  // console.log("*********************************************")

  // \ -> /
  exec(textComand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return;
    }
    //!Aurelio, quedamos en la eliminacion del archivo, por algun motivo, cuando queremos eliminar no se logra hasta que se cierra la consola
    // fs.unlink(origin).then(data=>console.log("Lo aliminamos bro: ", data))
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    // console.log(`origin: ${origin}`)
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    let data = fs.unlink("E:/Documentos/Escritorio/Practicas/plataformaVideo/uploads/temporal/fd6d2c6d-3bd4-4dea-aaa8-f13547df78f7", function(err){
      if(err)console.log("puttoooooo error: ", err)
      console.log(data, "  ------------------ ")
    })

    // fs.unlink("E:/Documentos/Escritorio/Practicas/plataformaVideo/utilities/../uploads/temporal/"+filePath, (err => { 
      
    //   if (err) console.log(err); 
    //   else { 
    //     console.log("\nDeleted file: example_file.txt"); 
      
    //     // Get the files in current directory 
    //     // after deletion 
    //   } 
    // }));

    console.log("filePath: ", filePath)

    console.log('proceso terminado', stdout, stderr)
  })
}
