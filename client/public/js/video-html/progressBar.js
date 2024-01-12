async function init(video, hls, videoContainer, canvasProgressSelector, canvas1Selector, canvas2Selector){

    let d = document
    let $videoContainer = d.querySelector(videoContainer)
    let $canvasProgress = d.querySelector(canvasProgressSelector)
    let $buffer = d.querySelector(canvas1Selector)
    let $progress = d.querySelector(canvas2Selector)
    let totalWidth = 300
    let totalHeight = 150
    let duration = hls.hlsElement.videoDuration

    //?para mostrar las descargas en buffer
    let ctx1 = $buffer.getContext("2d")

    let ctx2 = $progress.getContext("2d")
    ctx2.fillStyle = "rgb(255,0,0)"

    hls.on('playing', moveProgress)
    hls.on("add", drawBuffer)

    $progress.addEventListener("click", e=>{
        let distancia = $videoContainer.offsetLeft
        let toca = e.clientX
        let contenedor = $canvasProgress.clientWidth
        let diferencia = toca - distancia
        let porcentaje = (diferencia*100)/contenedor

        let pos = (totalWidth * porcentaje)/100

        ctx2.clearRect(0,0,totalWidth,totalHeight)
        ctx2.fillStyle = "rgb(255,0,0)"
        ctx2.fillRect(0,0,pos,150)

        video.currentTime = (video.duration*porcentaje)/100
    })

    async function moveProgress(){
        try{
            let point = 8
            let porcentaje = (video.currentTime*100)/video.duration
            point = Math.round((totalWidth*porcentaje)/100)+2
            ctx2.clearRect(0,0,totalWidth,totalHeight)
            ctx2.fillRect(0,0,point,totalHeight)
        }catch(err){
            console.log(err)
        }
    }
    
    async function drawBuffer(){
        let timeRanges = await hls.getTimeRanges()
        ctx1.clearRect(0,0,totalWidth, totalHeight)
        timeRanges.forEach(([start, end]) => {
            let startPersentege = (start*100)/duration
            let endPersentege = (end*100)/duration

            let bufferStartPx = (totalWidth * startPersentege)/100
            let bufferEndPx = (totalWidth * endPersentege)/100
            ctx1.fillStyle = "rgb(255,179,179)"
            ctx1.fillRect(bufferStartPx,0,(bufferEndPx-bufferStartPx),150)
        });
    }
}

export default init