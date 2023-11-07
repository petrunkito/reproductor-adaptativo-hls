//*este modulo lo ocupamos para ejecutar acciones despues de otras, por ejemplo:
//*si la subida de los archivos a terminado se dispoara el evento "uploadedFiles"
//*indicando que se subieron los archivos, por ende el siguiente paso seria fragmentarlos

//?traemos el modelo de File y Playlist, para insertar datos en la base de datos
let modelFile = require("../model/modelFile")
let modelPlaylist = require("../model/modelPlaylist")
let fs = require('fs')//?para manipular los archivos del sistema
let paths = require("../paths")//?las rutas hacia diferentes puntos de la aplicacion
//?construimos nuestro emisor de eventos, 
let { EventEmitter } = require("events")
let emitter = new EventEmitter()


//?el evento "uploadedeFiles" se dispara cuando se subieron exitosamente los archivos al servidor
//?de tal modo, que el siguiente paso es fragmentar cada uno de los archivos al formato Hls
emitter.on("uploadedFiles", async (data) => {
    try {
        /*(data) es una variable que contiene los nombres de los archivos a fragmetar: 
        [
            {
                name: 'video1.mp4',
                size: 11232700,
                folderName: 'f9151b78-a232-49e8-ba50-5c70f9bc7ad5',
                key: 'video6'
            },
            {
                name: 'video2.mp4',
                size: 783403,
                folderName: '3088f02d-3469-4fc4-9ace-7307bf250676',
                key: 'video8'
            }
        ]
         */
        //?importamos aqui dentro al escript de "ffmpegScript" para evitar alguana recursividad con el modulo "eventCoordinator"
        //?ya que el script "ffmpeg" tambien manda a llamar a la libreria "eventCoordinator" para disparar los eventos
        const ffmpegScript = require("./ffmpeg")

        //?le mandamos cada objeto con la informacion del archivo a fragmentar,
        //?la funcion ffmpegScript solo puede aceptar uno a la vez, pero al ser una funcion asincrona
        //?y no bloquea el codigo del bucle for, se manda los siguientes archivos uno tras otro, abriendo 
        //?procesos uno al lado del otro
        for (let i = 0; i < data.length; i++) {
            ffmpegScript(data[i])
        }
    } catch (err) {
        console.log("eventCoorditanor emitter.on(uploadedFiles) err: ", err)
    }
})

//?el evento "hlsFilesCreated" se dispara una vez los formatos Hls de un video se crearon exitosamente,
//?de talmodo, que el siguiente paso es crear los registros en la base de datos del modelo
//?"File" y "Playlist" con la respectiva informacion del archivo y sus fragmentos creados
emitter.on("hlsFilesCreated", async (data) => {
    try {
        /*(data) es una variable que contiene el nombre de la carpeta del archivo fragmentado
        {
            name: 'video2.mp4',
            size: 783403,
            folderName: '3088f02d-3469-4fc4-9ace-7307bf250676',
            key: 'video8'
        }
    */

        //?insertamos en la base de datos, los detalles del archivo fragmentado, como nombre del archivo, el nombre de la
        //?carpeta donde se encuentran sus archivos fragmentados etc.
        await modelFile.insertMany([{
            nameFile: data.name,
            size: data.size,
            folderName: data.folderName
        }])

        //?creamos un stream de lectura, para leer el archivo "playlist.m3u8", 
        //!nota: el archivo "playlist.m3u8" es un archivo que contiene informacion hacerca de las resoluciones
        //!en la que esta disponible un video, por ejemplo: 360, 480, etc...,
        let readableStream = fs.createReadStream(`${paths.pathFile}/${data.folderName}/playlist.m3u8`)

        //?en esta variable se almacenara los datos que se insertaran en el model Playlist como:
        /*
          {
            folderName,
            resolutions,
            fragments
          }
        */
        let playlist = {}
        playlist.folderName = data.folderName//?gurdamos el nombre de la carpeta inmediatamente en el objeto "playlist"

        //?empezamos la lectura del archivo a travez de streams, y almacenamos cada pedazo en el arreglo
        //?cunkPlaylist
        let chunkPlaylist = []
        readableStream.on("data", chunk => {
            chunkPlaylist.push(chunk)
        })


        //?una vez la lectura termina, ejecutamos el siguiente callback
        readableStream.on("end", async () => {
            //?el metodo "concat" de la clase buffer, nos retorna un buffer, apartir de un arreglo de buffers asi:
            /*
               let buffers = [Buffer1, Buffer2, Buffer3]
               let buffer Buffer.concat(buffers)
             */
            let file = Buffer.concat(chunkPlaylist)
            //?convertimos a un string el buffer, ya que obtendremos los datos del archivo "playlist.m3u8".
            let text = file.toString()
            /*(text)
                #EXTM3U
                #EXT-X-VERSION:3
                #EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=426x240
                240p.m3u8
                #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
                360p.m3u8
             */
            //?extraemos la resoluciones en la que estara cada version del video
            playlist.resolutions = text.match(/(\d+x\d+)/gm)//[ '426x240', '640x360' ]
            //?extraemos los manifiestos(los archivos con extension .m3u8) de cada resoluciones, para luego obtener
            //?un registro de cuantos fragmentos hay para cada resolucion
            let manifests = text.match(/\d+[a-zA-Z]?\.m3u8/gm)//[ '240p.m3u8', '360p.m3u8' ]

            //?aqui guardaremos cuantas fragmentos hay para cada resolucion, el formato que seguiremos sera el siguiente:
            /*(fragments)
            [
                {manifests:"240p.m3u8", files:[{240p_000.ts: '#EXTINF:10.010000'}, {240p_001.ts: '#EXTINF:10.010000'}, ...]},
                {manifests:"360p.m3u8", files:[{360p_000.ts: '#EXTINF:10.010000'}, {360p_001.ts: '#EXTINF:10.010000'}, ...]}
            ]
            */
            let fragments = []

            //?iteramossobre el arreglo "manifests" para iterar en cada uno de los archivos ".m3u8"
            //?y asi obtener un listado con todos los archivos ".ts"
            for (let i = 0; i < manifests.length; i++) {
                let element = {}
                element.resolution = playlist.resolutions[i]//?tambien agregamos us respectiva resolucion, para que luego la busqueda de los fragmentos sea mas facil
                element.manifest = manifests[i]

                //?decidimos en este caso, usar el "readFileSync" ya que son archivos muy pequeños 
                //?y no valdria la pena agregar mas complejidad usando streams, por eso los abrimos de manera sincrona
                let file = fs.readFileSync(`${paths.pathFile}/${data.folderName}/${manifests[i]}`).toString()
                /*(file) nos mostraria un archivo parecido a esto:
                    #EXTM3U
                    #EXT-X-VERSION:3
                    #EXT-X-TARGETDURATION:10
                    #EXT-X-MEDIA-SEQUENCE:0
                    #EXT-X-PLAYLIST-TYPE:VOD
                    #EXTINF:10.010000,
                    240p_000.ts
                    #EXTINF:10.010000,
                    240p_001.ts
                    #EXTINF:10.010000,
                    240p_002.ts
                    #EXTINF:10.010000,
                    #EXT-X-ENDLIST
                */
                //?obtenemos las duraciones en segundos de cada fragmento, primero usamos la funcion match para obtener el patron
                //?el resultado es: ["#EXTINF:10.010000", "#EXTINF:10.010000", "#EXTINF:10.010000"], pero usamos el map
                //?para editar el arreglo, para obtener esto: [10.010000, 10.010000, 10.010000], usando la funcion slice
                //?que corta de una posicion a otra, y nos apoyamos de la funcion search, para obtener la posicion desde 
                //?la que inicia el numero despues del ":".
                let durations = file.match(/#EXTINF:\d+\.\d+/g).map(((element) => {
                    return element.slice(element.search(/\d+\.\d+/), element.length)
                }))
                //?lo que hacemos aqui, es agregar a "element.files" un arreglo de objetos asi:[{ '360p_000.ts': '10.000000' },{ '360p_001.ts': '7.000000' }]
                //?que contenga tanto el fragmento como la duracion de cada uno.
                //?usamos match para conseguir un arreglo con cada fragmento asi: ["240p_000.ts", "240p_001.ts", "240p_002.ts"]
                //?luego con "map" editamos ese arreglo para agregar el fragmento mas la resolucion asi: {"240p_000.ts":"10.10000"}
                element.files = file.match(/^[0-9p_]+\.ts$/gm).map((element, index) => {
                    let text = `{"${element}":"${durations[[index]]}"}`//?{"240p_000.ts":"10.10000"}
                    return JSON.parse(text)//?usamos "JSON.parse" para convertir el string a un objeto javascript
                })
                
                //?y lo que almacenamos en "fragments" es un objeto como este:  {manifests:"240p.m3u8", files:[{'240p_000.ts':"10.001"}, {'240p_001.ts':"10.001"}, ...]},
                fragments.push(element)//? {manifests:"240p.m3u8", files:[{'240p_000.ts':"10.001"}, {'240p_001.ts':"10.001"}, ...]},
            }
            //?una vez que conseguimos todos los archivos con extension ".ts" y el nombre del manifiesto "240p.m3u8", 360p.m3u8", ...etc.
            playlist.fragments = fragments
            /*(playlist) este es el contenido final del objeto "playlist"
            folderName: 'a60f259f-d873-4935-b9bf-e5b63893d43f',
            resolutions: [ '426x240', '640x360' ],
            fragments: [
            {
                manifest: '240p.m3u8',
                files: [
                    {'240p_000.ts':"10.001"}, {'240p_001.ts':"10.001"}, {'240p_002.ts':"10.001"},
                    {'240p_003.ts':"10.001"}, {'240p_004.ts':"10.001"}, {'240p_005.ts':"7.0023"}
                ]
            },
            {
                manifest: '360p.m3u8',
                files: [
                    {'360p_000.ts':"10.001"}, {'360p_001.ts':"10.001"}, {'360p_002.ts':"10.001"},
                    {'360p_003.ts':"10.001"}, {'360p_004.ts':"10.001"}, {'360p_005.ts':"7.0023"}
                ]
            }
            */
            //?luego introducimos el registro en la base de datos
            await modelPlaylist.insertMany([playlist])
            emitter.emit("successfullySavedRecord", data.folderName)
        })

    } catch (err) {
        console.log("eventCoorditanor emitter.on(hlsFilesCreated) err: ", err)
    }
})



module.exports = emitter
