async function init(noticeSelector,inputSelector, deleteSelector, uploadSelector, anchorsSelector, containerVideosSelector, windowUploadSelector) {
    let d = document
    let noticeH1 = d.querySelector(noticeSelector)
    let $input = d.querySelector(inputSelector)
    let $btnDelete = d.querySelector(deleteSelector)
    let $btnUpload = d.querySelector(uploadSelector)
    let $anchorElements = d.querySelectorAll(anchorsSelector)
    let $containerVideos = d.querySelector(containerVideosSelector)
    let $window = d.querySelector(windowUploadSelector)

    let classWindow = "ocultar-ventana-upload"
    
    async function confirmVideos(){
        if($anchorElements.length===0){
            noticeH1.classList.remove("hidden-notice")
        }else{
            noticeH1.classList.add("hidden-notice")
        }
    }
    await confirmVideos()

    d.addEventListener('click', async (e) => {
        let target = e.target
        if (target === $btnDelete) await deleteText()
        if (target === $btnUpload) await upload()
        
    })
    $input.addEventListener("input", search)

    let timeout = null
    async function search() {
        clearTimeout(timeout)
        timeout = setTimeout(async () => {
            let text = $input.value.toLowerCase().trim().replace(/\s+/g, "|")
            if(!text) {
                await drawingElements()
                return
            }
            let filter = Array.from($anchorElements).filter((element, index)=>{
                let title = element.querySelector(".container-info p").innerHTML.toLowerCase()
                return new RegExp(text).test(title)?true:false
            })
            await drawingElements(filter)

        }, 1000)
    }
    
    async function drawingElements(elementsFilter){
        let fragment = d.createDocumentFragment()
        let elements = elementsFilter || $anchorElements
        elements.forEach(element=>{
            fragment.appendChild(element)
        })
        $containerVideos.innerHTML = ""
        $containerVideos.appendChild(fragment)
        await confirmVideos()
    }

    async function deleteText() {
        if(!$input.value) return
        $input.value = ""
        await drawingElements()
    }

    async function upload() {
        $window.classList.remove(classWindow)
    }

}
export default init

