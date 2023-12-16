import api from "/js/video-html/hls.js";
import controlsVideo from "/js/video-html/controlsVideo.js"
import drawResolutions from "/js/video-html/drawResolutions.js"
import progressBar from "/js/video-html/progressBar.js"

async function init(){
    let videoElement = document.querySelector("video");
    await api(videoElement, {}, async (hls)=>{
        console.log(hls.hlsElement)

        await drawResolutions(hls, ".list-resolutions", ".template-resolution")
        progressBar(videoElement, hls, ".video-container", ".playback-bar", "#canvas-buffer", "#canvas-progress")
        await controlsVideo(videoElement, hls, ".play-pause-button", ".volume-button", 
        ".volume-range", ".resolution-button", "maximize-button", ".time-text", ".list-resolutions", ".list-resolutions div")
        
    });

}

init()
