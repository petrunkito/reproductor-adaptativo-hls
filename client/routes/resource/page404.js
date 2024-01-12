let fs = require('fs')
let paths = require("../../paths.js")

let page404 = async (req, res)=>{
    try{
        let page = fs.createReadStream(`${paths.pages}/page404.html`)
        return page.pipe(res)
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

module.exports = page404
