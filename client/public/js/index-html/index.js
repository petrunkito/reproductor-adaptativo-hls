import drawingElements from "./drawingElements.js";
import uploadFile from "./uploadFile.js"
import navFuncionality from "./navFuncionality.js"

//?eliminar al iniciar el archivo
// document.querySelector("div.container-ventana").classList.remove("ocultar-ventana-upload")

async function init(){
    await drawingElements()

    await navFuncionality(".notice",".content-input-search_input",".content-image img", 
    ".upload-file button", "#container-videos a", "#container-videos", ".container-ventana")
    
    await uploadFile("div.container-ventana","button.exit-upload", "button.find-video", "button.upload-video", "input#my-file", 
    "p.drag-alert-p", "p.drag-text-p", ".drag-container img")
    

}

init()

