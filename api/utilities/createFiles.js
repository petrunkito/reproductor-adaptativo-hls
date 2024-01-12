//*este archivo esta encargado de crear las siguientes carpetas
/**
 * -uploads:donde se almacenaran los archivos fragmentados de cada video
 *  -temp:aqui se almacena de manera temporal los videos del usuario que luego seran fragmentados
 */

//?para trabajar con el sistema de archivos
const fs = require("fs/promises")
//?mis atajos de rutas 
const paths = require("../paths")
//?para el manejo de rutas
const path = require("path")

async function init(){
    try{
        //!Nota: si las carpetas ya existen, este no arroja ningun error y no sobreescribe ningun archivo
        //?creamos nuestras carpetas asi: /uploads/temp en la raiz del proyecto
        let resultado = await fs.mkdir(path.join(paths.index, "uploads", "temp"), {recursive:true})
        //?si las carpetas se crearon imprimimos este mensaje
        if(resultado) console.log("directories created successfully")
    }catch(err){
        //?en caso de error, imprimimos el mensaje
        console.log("createFiles.js error: ", err)
    }
}

init()