let modelFile = require("../model/modelFile")
let modelPlaylist = require("../model/modelPlaylist")
let fs = require('fs')
let paths = require("../paths")
let { EventEmitter } = require("events")
let emitter = new EventEmitter()



emitter.on("uploadedFiles", async (data) => {
    try {
        const ffmpegScript = require("./ffmpeg")
        for (let i = 0; i < data.length; i++) {
            ffmpegScript(data[i])
        }
    } catch (err) {
        console.log("ocurrion un enorme error")
        console.log(err)

    }
})

emitter.on("hlsFilesCreated", async (data) => {

    await modelFile.insertMany([{
        nameFile: data.name,
        size: data.size,
        folderName: data.folderName
    }])

    let readableStream = fs.createReadStream(`${paths.pathFile}/${data.folderName}/playlist.m3u8`)

    let playlist = {}
    playlist.folderName = data.folderName

    let chunkPlaylist = []
    readableStream.on("data", chunk => {
        chunkPlaylist.push(chunk)
    })



    readableStream.on("end", async () => {
        let file = Buffer.concat(chunkPlaylist)
        let text = file.toString()
        
        playlist.resolutions = text.match(/(\d+x\d+)/gm)//[ '426x240', '640x360' ]
        let manifests = text.match(/\d+[a-zA-Z]?\.m3u8/gm)//[ '240p.m3u8', '360p.m3u8' ]

        let fragments = []

        console.log("antes del bucle")
        for (let i = 0; i < manifests.length; i++) {
            let element = {}
            element.manifest = manifests[i]

            let file = fs.readFileSync(`${paths.pathFile}/${data.folderName}/${manifests[i]}`)
            console.log(typeof file.toString())
            element.files = file.toString().match(/^[0-9p_]+\.ts$/gm)
            fragments.push(element)
        }
        playlist.fragments = fragments
        await modelPlaylist.insertMany([playlist])
    })

})


module.exports = emitter