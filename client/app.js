const express = require("express")//?para la construccion de la api
const http = require("http")//?para crear nuestro servidor
const pages = require('./routes/')

let app = express()
let server = http.Server(app)

app.disable('x-powered-by');//?desactivamos la cabecera "x-powered-by", para evitar que los atacantes sepan que usa express, e  iniciar ataques con destinos específicos.
app.use(express.static(`${__dirname}/public`))//?aqui servimos los archivos publicos
app.set("port", process.env.PORT || 5050)//?vemos que puerto usaremos
app.use(express.json())//?para que formatee en json
app.use(pages)


module.exports = {server, app}

//?aurelio, ya lo unico que hace falta es documentar todo el codigo y habremos terminado
//? todo el proyecto, te felicito AURELIO, lo lograste




