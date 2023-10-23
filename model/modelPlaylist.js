let mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    resolutions:[
        {type:String, required:treu}
    ],
    fragments: [
        {
            resolution:{type:String, required:true},
            files:[
                {type:String, required:true}
            ]
        }
    ],
})

let Playlist = mongoose.model("Playlist", Schema)

module.exports = Playlist