async function init(window, exitSelector, findSelector, uploadSelector, inputSelector, alertSelector, textSelector, imgSelector) {
    let d = document
    let windowUpload = d.querySelector(window)
    let $btnExit = d.querySelector(exitSelector)
    let $btnFind = d.querySelector(findSelector)
    let $btnUpload = d.querySelector(uploadSelector)
    let $inputFile = d.querySelector(inputSelector)
    let $alertP = d.querySelector(alertSelector)
    let $textP = d.querySelector(textSelector)
    let $img = d.querySelector(imgSelector)

    let file = null
    let classInactive = "inactive-botton-upload"
    let textDefault = $textP.innerHTML
    let imageDefault = $img.src
    let uploadTextDefault = $btnUpload.innerHTML


    d.addEventListener('click', async (e) => {
        e.stopPropagation()
        let target = e.target
        if (target === $btnFind && !Array.from($btnFind.classList).includes(classInactive)) await openFileExplorer()
        if (target === $btnUpload && !Array.from($btnUpload.classList).includes(classInactive)) await uploadFile()
        if (target === $btnExit && !Array.from($btnExit.classList).includes(classInactive)) await closeWindowUpload()
    })

    $inputFile.addEventListener('input', reviewFile)

    async function openFileExplorer() {
        console.log("revisando archivo")

        $inputFile.click()
    }

    async function closeWindowUpload(){
        windowUpload.classList.add("ocultar-ventana-upload")
    }

    async function reviewFile(e) {
        file = $inputFile.files[0]
        $inputFile.value = ""
        if (!file) return//?si el usaurio no eligio ningun archivo, entonces no hacemos nada
        let regex = new RegExp("video\/(mp4|webm|mkv|avi)")
        let value = regex.test(file.type)
        value ? await allowedFile() : await fileNotAllowed()
    }
    
    async function allowedFile() {
        $textP.innerHTML = `Archivo seleccionado <strong>${file.name}</strong>`
        $alertP.innerHTML = ""
        $img.src = imageDefault
        $btnUpload.innerHTML = uploadTextDefault
        $btnUpload.classList.remove(classInactive)
    }

    async function fileNotAllowed() {
        $img.src = imageDefault
        $textP.innerHTML = textDefault
        $alertP.innerHTML = `El archivo <strong>${file.name}</strong> es invalido, tiene que ser un archivo en los siguientes formatos: mp4,webm,mkv,avi.`
        $btnUpload.classList.add(classInactive)
        file = null
    }

    async function preUpload() {
        $btnExit.classList.add(classInactive)
        $btnFind.classList.add(classInactive)
        $img.src = "img/cargar-animado.gif"
    }

    async function uploadSucced() {
        $textP.innerHTML = "Archivo subido exitosamente, espera unos minutos para que pueda ver su video."
        $img.src = "img/cheque.gif"
        $btnUpload.classList.add(classInactive)
        $btnExit.classList.remove(classInactive)
        $btnFind.classList.remove(classInactive)
        file = null
    }

    async function uploadError() {
        $btnUpload.classList.remove(classInactive)
        $btnExit.classList.remove(classInactive)
        $btnFind.classList.remove(classInactive)
        $img.src = "img/fallar.gif"
        $alertP.innerHTML = "No se logro subir el archivo"
        $btnUpload.innerHTML = "Reintentar"

    }

    async function uploadFile() {

        try {
            if (!file) return
            await preUpload()

            let formData = new FormData();
            formData.append('video', file);

            let result = await fetch('http://localhost:3000/api/uploader', {
                method: "POST",
                body: formData
            })
            let json = await result.json()
            json.ok ? await uploadSucced():await uploadError()
            
        } catch (err) {
            await uploadError()
        }



    }
}
export default init
