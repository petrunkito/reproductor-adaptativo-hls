
async function init(videoElement, hls, playPauseSelector, volumeSelector, volumeRangeSelector,
    changeResolutionSelector, maximizeSelector, timeSelector, listResolutionsSelector, childResolution) {
    let d = document

    let video = videoElement
    let $playPauseButton = d.querySelector(playPauseSelector)
    let $volumeButton = d.querySelector(volumeSelector)
    let $volumeRangeInput = d.querySelector(volumeRangeSelector)
    let $changeResolutionButton = d.querySelector(changeResolutionSelector)
    let $maximizeButton = d.querySelector(maximizeSelector)
    let $time = d.querySelector(timeSelector)
    let $listResolutionDiv = d.querySelector(listResolutionsSelector)

    let imagePlayPauseDefault = $playPauseButton.src
    let imageVolumeButton = $volumeButton.src

    let statePlayPauseButto = ["play", "pause"]
    let showListResolutionClass = "show-resolutions"


    d.addEventListener("click", async (e) => {
        let target = e.target
        if (target === $playPauseButton) await playPauseVideo(e)
        if (target === $volumeButton) await mute(e)
        if (target === $changeResolutionButton) await showAndHideResolutionsList(e)
        if (target.matches(childResolution)) changeResolution(e)
    })


    async function getTime(time, sum=0) {
        let tiempo = time
        let minutos = parseInt(tiempo / 60)
        let segundos = parseInt(tiempo % 60)

        if (minutos >= 0 && minutos < 10) minutos = "0" + minutos
        // if(segundos ,)
        if (segundos >= 0 && segundos < 10) segundos = "0" + segundos
        return `${minutos}:${segundos}`
    }

    hls.on("playing", async () => {
        try {
            let textFormat = `${await getTime(video.currentTime)}:/${await getTime(video.duration)}`
            $time.innerHTML = textFormat
        } catch (err) {
            console.log(err)
        }
    })

    hls.on("finish", async ()=>{
        let textFormat = `${await getTime(video.duration)}:/${await getTime(video.duration)}`
            $time.innerHTML = textFormat
    })


    $volumeRangeInput.addEventListener("change", changeVolume)
    $volumeRangeInput.addEventListener('change', confirmVolume)

    let firtsTime = true
    async function playPauseVideo(e) {
        let target = e.target
        const isPlaying = target.dataset.play === "play";
        if (isPlaying) {
            video.pause();
            target.src = "/img/pausa.png";
        } else {
            video.play();
            target.src = imagePlayPauseDefault;
        }

        target.dataset.play = isPlaying ? "pause" : "play";
    }

    async function mute(e) {
        let target = e.target
        let isMute = target.dataset.volume === "on"
        if (isMute) {
            video.volume = 0
            target.src = "/img/silencio.png"
        } else {
            let volumeStored = parseFloat(localStorage.getItem(hls.hlsElement.keyVolume)) || 1
            video.volume = volumeStored
            $volumeButton.src = imageVolumeButton
        }
        $volumeRangeInput.value = (100 * video.volume)
        target.dataset.volume = isMute ? "off" : "on"
    }

    async function confirmVolume() {
        $volumeRangeInput.value = (100 * parseFloat(localStorage.getItem(hls.hlsElement.keyVolume)))
        if($volumeRangeInput.value === "0"){
            $volumeButton.dataset.volume = "off"
            $volumeButton.src = "/img/silencio.png"
        }else{
            $volumeButton.dataset.volume = "on"
            $volumeButton.src = imageVolumeButton
        }
    }
    async function changeVolume(e) {
        let target = e.target
        let value = (parseFloat(target.value) / 100)
        video.volume = value
        localStorage.setItem(hls.hlsElement.keyVolume, value)
    }
    await confirmVolume()

    async function showAndHideResolutionsList(e) {
        $listResolutionDiv.classList.toggle(showListResolutionClass)
    }

    async function changeResolution(e) {
        let target = e.target
        hls.changeResolution(target.dataset.pos)
        $listResolutionDiv.classList.toggle(showListResolutionClass)

    }

}


export default init