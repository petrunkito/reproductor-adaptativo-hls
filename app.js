let express = require("express")
let cors = require("cors")
let http = require("http")
let fileUpload = require("express-fileupload")
let routes = require("./routes/index")

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