//*este modulo se encarga de facilitar un atajo a las rutas de la aplicacion
/**esto para evitar que al requerir un modulo se haga esto:
 * require("../../../carpeta/")
 * ademas evitamos los problemas de rutas en los sistemas operativos
 * cuando se usa "/" o "\".
 */
let path = require("path")

module.exports = {
    index: path.join(__dirname),//?la ruta que indica la raiz del proyecto
    tempFile:path.join(__dirname, "uploads", "temp"),//?la ruta donde se suben los videos de manera temporal, para que luego el sistema pueda fragmentar el video, y luego eliminar este archivo
    pathFile:path.join(__dirname, "uploads"),//?la ruta donde se encuentran los videos ya fragmentados
    createVodHls:path.join(__dirname, "create-vod-hls.sh")//?la ruta al archivo "create-vod-hls.sh" encargado de fragmentar los videos en las diferentes resoluciones
}