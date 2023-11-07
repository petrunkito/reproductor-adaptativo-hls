//*esta api se encargara de devolvernos un fragmento en la resolucion que deseemos de un video
const modelPlaylist = require("../model/modelPlaylist")//?para trabajar con la coleccion "Playlist" de nuestra base de datos
const paths = require("../paths")//?utilizaremos nuestras rutas por defecto
const fs = require("fs")//?para manipular los archivos de nuestro servidor

let controllerFragments = {}

//?obtiene un fragmento en la resolucion deseada
controllerFragments.getFragments = async function (req, res) {
    try {
        //?recibimos el nombre de la carpeta del archivo
        let folderName = req.params.folderName
        //?en el body, necesitamos la resolucion y posicion del archivo que se va a solicitar
        let { position = 0, resolution } = req.query
        if (!resolution) return res.status(400).json({ ok: false, message: "all fields are required" })//?si no envian la resolucion, mandamos este mensaje

        //?buscamos el documento en la base de datos, en caso de que no se encuentre el archivo
        //?mandamos la respuest de archivo no encontrado
        let playlist = await modelPlaylist.findOne({ folderName })
        if (!playlist) return res.status(404).json({ ok: false, message: "resource not found" })
        /*(playlist) esta es la informacion que se almacena en playlist en caso de exito
        {
        _id: ObjectId("653d9adeadcc11fbfd18d001"),
        folderName: 'dbff3a41-d288-4efa-ae88-5d2dd643a777',
        resolutions: [ '426x240', '640x360' ],
        fragments: [
        {
            resolution: '426x240',
            manifest: '240p.m3u8',
            files: [
            {'240p_000.ts':"10.001"}, {'240p_001.ts':"10.001"}, {'240p_002.ts':"10.001"},
            {'240p_003.ts':"10.001"}, {'240p_004.ts':"10.001"}, {'240p_005.ts':"7.0023"}
            ],
            _id: ObjectId("653d9adeadcc11fbfd18d002")
        },
        {
            resolution: '640x360',
            manifest: '360p.m3u8',
            files: [
            {'360p_000.ts':"10.001"}, {'360p_001.ts':"10.001"}, {'360p_002.ts':"10.001"},
            {'360p_003.ts':"10.001"}, {'360p_004.ts':"10.001"}, {'360p_005.ts':"7.0023"}
            ],
            _id: ObjectId("653d9adeadcc11fbfd18d003")
        }
        ]
        }
        */

        //?verificamos que la resolucion que nos envian se encuentre en el objeto, en caso de que se pida
        //?una resolucion qu eno existe, mandamos la siguiente respuesta
        if (!playlist.fragments.some(element => element.resolution === resolution)) return res.status(404).json({ ok: false, message: "resource not found" })
        //?una vez revisamos que la resolucion esta disponible, la filtramos para trabajar con ella, y ya que filter me devuelve
        //?un array, mandamos a traer la posicion "0" para trabajar sobre el objeto
        let data = playlist.fragments.filter(element => element.resolution === resolution)[0]
        console.log("data: ", data)
        /*(data) eston es lo que almacena data despues de filtrar
        {
                resolution: '426x240',
                manifest: '240p.m3u8',
                files: [
                {'240p_000.ts':"10.001"}, {'240p_001.ts':"10.001"}, {'240p_002.ts':"10.001"},
                {'240p_003.ts':"10.001"}, {'240p_004.ts':"10.001"}, {'240p_005.ts':"7.0023"}
                ],
                _id: ObjectId("653d9adeadcc11fbfd18d002")
            }
            */

        //?verificamos si la posicion del archivo que desean existe, en caso de que no exista el archivo
        //?en la posicion que desean, mandamos la siguiente respuesta
        if (!data.files[position]) return res.status(404).json({ ok: false, message: "resource not found" })

        //?le indicamos al cliente con la cabecera "application/octet-stream", que se le enviara un archivo binario
        res.writeHead(200, { "Content-Type": "application/octet-stream" })
        
        //?recordar que 'data.files[position]' nos devuelve esto: {"240p_000.ts":"10.0100"}, entonces para buscar el archivo
        //?correctamente en nuestro servidor extraemos el nombre del fragmento con el siguiente codigo:
        let fragment = Object.keys(data.files[position])[0]//?"240p_000.ts"
        let readableStream = fs.createReadStream(`${paths.pathFile}/${folderName}/${fragment}`)
        //!nota: el archivo que se manda, no se manda con su extension(.ts) sino como un archivo
        //!binario sin estension asi: video.ts --> video, sin ninguna extension!.

        //?le envimos un flujo de datos al cliente
        return readableStream.pipe(res)
    } catch (err) {
        console.log("controllerFragment getFragments err: ", err)
        return res.status(500).json({ ok: false, message: "an error ocurred with the server" })
    }
}

module.exports = controllerFragments