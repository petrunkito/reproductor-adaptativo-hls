let mongoose = require('mongoose')
//?este es el model de nuestra coleccion "File"
let Schema = new mongoose.Schema({
    nameFile:{type:String, required:true},//?nombre original del archivo
    size: {type:String, required:true},//?el tamaño del archivo
    folderName:{type:String, required:true}//?el nombre de la carpeta de los fragmentos
})

/*ejemplo de lo que se almacena

{
    _id: ObjectId("653d99dfadcc11fbfd18cff9"),
    nameFile: 'videorecortado.mp4',
    size: '783403',
    folderName: '25a8d6e7-4d47-453a-9c2e-5f4ac0b2b293',
    __v: 0
  }
 */

//?aqui creamos el model "file"
let File = mongoose.model("File", Schema)

module.exports = File