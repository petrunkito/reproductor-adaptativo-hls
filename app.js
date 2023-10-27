let express = require("express")
let cors = require("cors")
let http = require("http")
let fileUpload = require("express-fileupload")
let routes = require("./routes/index")

// require("./utilities/eventCoordinator")
const {EventEmitter} = require('events')
const emitter = new EventEmitter();

emitter.on("eventos",(data) => {
    console.log('ejecutandose---->>>>')
    // for (let i = 0; i < data.length; i++) {
    //     ffmpegScript(listNameFiles[i])
    // }
})



require("./model/connection")

let app = express()
let server = http.Server(app)

app.use(fileUpload({
    createParentPath:true
}))
app.use(express.static(`${__dirname}/public`))
app.set("port", process.env.PORT || 3000)
app.use(cors())
app.use(express.json())
app.use("/api",routes)

module.exports = {server, app}




