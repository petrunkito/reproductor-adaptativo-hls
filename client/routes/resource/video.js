let fs = require('fs')
let paths = require("../../paths.js")


let video = async (req, res)=>{
    try{
        
        let urlSearchParams = new URL(req.url, `http://${req.headers.host}`).searchParams
        let folderName = urlSearchParams.get("folderName")
        if(!folderName) return  res.redirect("/")

        let page = fs.createReadStream(`${paths.pages}/video.html`)
        return page.pipe(res)
    }catch(err){
        return res.status(500).json({ok:false, message:"ocurrio un error con el servidor"})
    }
}

module.exports = video