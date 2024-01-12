let mongoose = require('mongoose')
//?este es el model de nuestra coleccion "Playlist"
let Schema = new mongoose.Schema({
  folderName: { type: String, required: true },//?el nombre de la carpeta de los fragmentos
  resolutions: [//?las resoluciones disponibles para el video
    { type: String, required: true }
  ],
  fragments: [//?aqui guardaremos los detalles de los fragmentos de video
    {
      resolution: { type: String, required: true },//?la resolucion que corresponde
      manifest: { type: String, required: true },//?su manifiesto en extension (.m3u8)
      files: [//?los nombres de cada fragmento(.ts) junto con la duraccion correspondiente

      ]
    }
  ],
})

/* ejemplo de lo que se almacena
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
    ],
    __v: 0
  }

 */

//?aqui creamos el model "playlist"
let Playlist = mongoose.model("Playlist", Schema)

module.exports = Playlist