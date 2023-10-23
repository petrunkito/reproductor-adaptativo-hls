let mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    playList:{type:mongoose.Schema.Types.ObjectId, ref:"Playlist"},
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    nameFile:{type:String, required:true},
    folderName:{type:String,required:true},
})

let File = mongoose.model("File", Schema)

module.exports = File