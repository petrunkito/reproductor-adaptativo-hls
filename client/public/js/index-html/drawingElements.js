import api from "../api.js"
async function init() {
    let result= await api.getFiles()

    let template = document.querySelector("template")
    let container = document.querySelector("#container-videos")
    let fragment = document.createDocumentFragment()

    for(let i=0;i<result.length;i++){
        let element=result[i]
        const clone = template.content.cloneNode(true);

        let $a = clone.querySelector("a")
        $a.href = $a.href+element.folderName
        let $p = clone.querySelector(".container-info p")
        $p.innerHTML = element.nameFile

        fragment.appendChild(clone)
    }

    container.appendChild(fragment)

}

export default init
