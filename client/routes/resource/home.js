let fs = require('fs')
let paths = require("../../paths.js")
// console.log("puta madre")

let home = async (req, res)=>{
    try{
        let index = fs.createReadStream(`${paths.pages}/index.html`)
        return index.pipe(res)
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

module.exports = home
