let mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    nameFile:{type:String, required:true},
    size: {type:String, required:true},
    folderName:{type:String, required:true}
})

let File = mongoose.model("File", Schema)

module.exports = File