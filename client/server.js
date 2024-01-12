//*en este archivo inicializamos el servidor, en el puerto correspondiente

//?exportamos el server(servidor) y una variable "app" para obtener el purto, y luego inicializar
//?el servidor con el metodo "listen"
let {server, app} = require("./app")
server.listen(app.get("port"), ()=>{
    console.log("ejecutando en el puerto: ", app.get('port'))
})