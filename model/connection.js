let mongoose = require('mongoose')//?para lograr lo conexion a la base de datos
let dbConfig = require('../config/db.config.json')//?obtenemos el host, puerto y la db de mongodb

//?si la url de mongo no es proporcionada, usamos el segundo valor
var MONGO_URL = process.env.MONGO_URL || `mongodb://${dbConfig.local.host}/${dbConfig.local.db}`

//?nos conectamos a la base de datos
mongoose.connect(MONGO_URL)

//?se ejecutara cuando se conecte a la base de datos
mongoose.connection.on('connected', function () {
    console.log('Conectado a la base de datos --> : ' + MONGO_URL)
})
//?se ejecutara cuando halla algun error en la conexion
mongoose.connection.on('error', function (err) {
    console.log('Error al conextar a la base de datos: ' + err)
})
//?se ejecutara cuando la base de datos se sierre o desconecte
mongoose.connection.on('disconnected', function () {
    console.log('Desconectado de la base de datos')
})

//?este evento se ejecuta cuando usamos Ctrl + C, cerrando la conexion de la base de datos y cerrando el proceso
process.on('SIGINT', function () {
    //?cerramos la conexion de la base de datos y si es exitoso, se cierra el proceso de nodejs
    mongoose.connection.close()
    .then(()=>{
        console.log('Desconectado de la base de datos al terminar la app')
        process.exit(0)
    })
})

