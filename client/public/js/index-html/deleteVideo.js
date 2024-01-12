import api from "/js/api.js"
async function init(deleteSelector, containerVideoSelector) {
    let container = document.querySelector(containerVideoSelector)
    let deleteImgButton = document.querySelector(deleteSelector)

    document.addEventListener("click", async (e) => {
        let target = e.target
        if (target.matches(deleteSelector)) deleteVideo(e)
    })

    async function deleteVideo(e) {
        e.preventDefault()
        let target = e.target
        let parent = target.parentNode
        let idFile = parent.dataset.id

        let result = await api.deleteFile(idFile)
        if(!result){
            alert("Hubo un error al querer elimnar el video, revisa la consola")
            return
        }
        container.removeChild(parent)
    }

}

export default init