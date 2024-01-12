//?este archivo sera el encargado de establecer la configuracion inicial de nuestro proyecto

const express = require("express")//?para la construccion de la api
const cors = require("cors")//?para habiliar que dominios pueden acceder a la aplicacion
const http = require("http")//?para crear nuestro servidor
const routes = require("./routes/index")//?aqui se encontraran las rutas de nuestras APIs

//?nos conectamos a mongodb
require("./model/connection")
//?crea las carpeta "uploads" y "temp" si aun no estan creadas
require("./utilities/createFiles")//aurelio crea un modulo, que cree las carpetas uploads y temp

//?creamos el servidor
let app = express()
let server = http.Server(app)

app.disable('x-powered-by');//?desactivamos la cabecera "x-powered-by", para evitar que los atacantes sepan que usa express, e iniciar ataques con destinos específicos.
app.set("port", process.env.PORT || 3000)//?vemos que puerto usaremos
app.use(cors())//?de esta forma, todos los dominios pueden hacer peticiones a nuestro servidor
app.use(express.json())//?para que formatee en json
app.use("/api", routes)//?cada que accedan a la ruta de '/api'


module.exports = {server, app}




