//*este archivo esta encargado de crear las siguientes carpetas
/**
 * -uploads:donde se almacenaran los archivos fragmentados de cada video
 *  -temp:aqui se almacena de manera temporal los videos del usuario que luego seran fragmentados
 */

const fs = require("fs/promises")
const paths = require("../paths")
const path = require("path")

async function init(){
    try{
        let resultado = await fs.mkdir(path.join(paths.index, "uploads", "temp"), {recursive:true})
        if(resultado) console.log("directories created successfully")
    }catch(err){
        console.log("createFiles.js error: ", err)
    }
}

init()