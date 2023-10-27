const paths = require("./paths.js")
let fs = require("fs")

let data = {folderName:"b24089ed-ae06-448b-be12-337f54b0b393"}

let readableStream = fs.createReadStream(`${paths.pathFile}/${data.folderName}/playlist.m3u8`)

let playlist = {}
playlist.folderName = data.folderName

let chunks = []
readableStream.on("data", chunk=>{
    chunks.push(chunk)
})



readableStream.on("end", ()=>{
    let file = Buffer.concat(chunks)
    let text = file.toString()
    // console.log(text)
    playlist.resolutions = text.match(/(\d+x\d+)/gm)//[ '426x240', '640x360' ]
    let manifests = text.match(/\d+[a-zA-Z]?\.m3u8/gm)//[ '240p.m3u8', '360p.m3u8' ]
    let fragments = []

    // console.log(playlist.resolutions, manifests)

    // //!aurelio, quedamos en la parte donde empezamos a leer cada manifiesto de reproduccion, 
    // //!para luego listar cuales son los archivos con extension (.ts), y poder agregarlo a la base de datos
    // //!pero estaba pensando que esto hace un tipo de callbcack, pero con eventos, lo cual hay que analizar
    // //!pues no es tan largo el codigo que abria que hacer
    for(let i=0;i<manifests.length;i++){
        let obj = {}
        obj.playlist = manifests[i]

        let readableStream = fs.createReadStream(`${paths.pathFile}/${data.folderName}/${manifests[i]}`)
        let chunkStore = []
        readableStream.on('data', (chunk)=>{
            chunkStore.push(chunk)
        })

        readableStream.on("end", ()=>{
            let file = Buffer.concat(chunkStore).toString()
            obj.files = file.match(/^[0-9p_]+\.ts$/gm)
            console.log(obj)
        })



    }





})



