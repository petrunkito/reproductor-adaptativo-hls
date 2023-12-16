async function init(hls, listResolutionsSelector, templateResolution) {
    let d = document
    let listResolutionDiv = d.querySelector(listResolutionsSelector)
    let template = d.querySelector(templateResolution)

    // let currentResolutionPosition = hls.hlsElement.currentResolutionPosition

    let fragment = d.createDocumentFragment()
    hls.hlsElement.resolutions.forEach((element, index) => {
        let clone = template.content.cloneNode(true)

        clone.querySelector('div').dataset.select = "false"
        clone.querySelector('div').innerHTML = element
        clone.querySelector('div').dataset.pos = index
        clone.querySelector('div').dataset.resolution = element

        let resolutionStored = localStorage.getItem(hls.hlsElement.keyQuality)
        let indexResolution =  hls.hlsElement.resolutions.indexOf(resolutionStored)

        if (resolutionStored && index!==-1 && indexResolution === index ) {
            clone.querySelector('div').dataset.select = "true"
        }

        fragment.appendChild(clone)

    });

    listResolutionDiv.appendChild(fragment)

    hls.on("change", () => {
        try {
            let divs = listResolutionDiv.querySelectorAll('div')
            console.log(divs)
            divs.forEach((element, index) => {
                element.dataset.select = index === hls.hlsElement.currentResolutionPosition ? "true" : "false"
            });
        } catch (err) {
            console.log(err)
        }
    })


}

export default init