let mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    folderName:{type:String, required:true},
    resolutions:[
        {type:String, required:true}
    ],
    fragments: [
        {
            manifest:{type:String, required:true},
            files:[
                {type:String, required:true}
            ]
        }
    ],

})

let Playlist = mongoose.model("Playlist", Schema)

module.exports = Playlist